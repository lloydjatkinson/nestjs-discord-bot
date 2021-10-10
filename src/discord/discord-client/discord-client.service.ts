import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Client, Intents, TextChannel } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';

import { backOff } from 'exponential-backoff';

@Injectable()
export class DiscordClientService implements OnModuleInit {
    private readonly logger = new Logger(DiscordClientService.name);

    private readonly discordToken = this.configService.get<string>('DISCORD_TOKEN');
    private readonly discordApplicationId = this.configService.get<string>('DISCORD_APPLICATION_ID');
    private readonly discordGuildId = this.configService.get<string>('DISCORD_GUILD_ID');
    private readonly discordIntents = this.configService.get<number>('DISCORD_INTENTS');
    private readonly discordBotLogChannelId = this.configService.get<string>('DISCORD_BOT_LOG_CHANNEL_ID');

    private discordClient: Client;
    private discordRestClient: REST;

    constructor(private readonly configService: ConfigService) { }
    
    async onModuleInit() {       
        this.ensureMinimumConfiguration();

        await this.initialiseDiscordClient();
        await this.initialiseDiscordRestClient();
        // await this.registerCommands();
    }

    private ensureMinimumConfiguration () {
        if (!this.discordToken) {
            this.logger.error('Discord token must be configured to run this bot');
            process.exit(1);
        }
    }

    private async initialiseDiscordClient() : Promise<void> {
        try {
            this.discordClient = new Client({ intents: [Intents.FLAGS.GUILDS] });
            this.discordClient.login(this.discordToken);
    
            await this.discordClient.once('ready', async (client) => {
                this.logger.log('Discord client fired "ready" event');
            });
        } catch (error) {
            this.logger.error(`Failed to create Discord client: ${error.message}`);
        }

        this.logger.log('Created Discord client');
    }

    private async initialiseDiscordRestClient() : Promise<void> {
        try {
            this.discordRestClient = new REST({ version: '9' }).setToken(this.discordToken);
        } catch (error) {
            this.logger.error(`Failed to create Discord REST client: ${error.message}`);
        }

        this.logger.log('Created Discord REST client');
    }

    private async registerCommands() : Promise<void> {
        const commands = [
            new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
            new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
            new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
        ];
        
        try {
            await this.discordRestClient.put(Routes.applicationGuildCommands(this.discordApplicationId, this.discordGuildId), { body: commands });
    
            const routes: any = await this.discordRestClient.get(Routes.applicationGuildCommands(this.discordApplicationId, this.discordGuildId));
            this.logger.log(`Registered ${routes.length} commands`);
        } catch (error) {
            this.logger.error(`Failed to register commands: ${error.message}`);            
        }
    }

    public async registerCommand(slashCommand: SlashCommandBuilder) : Promise<void> {
        this.logger.verbose(`Registering command`);

        try {
            await backOff(async () => {
                await this.discordRestClient.put(Routes.applicationGuildCommands(this.discordApplicationId, this.discordGuildId), { body: slashCommand });
            }, { jitter: 'full' });
        } catch (error) {
            this.logger.error(`Failed to register command after multiple retries`);
        }
    }

    public async sendMessage(channelId: string, message: string) : Promise<void> {
        this.logger.verbose(`Sending message to channel ${channelId}: ${message}`);

        try {
            await backOff(async () => await (this.discordClient?.channels.cache.get(channelId) as TextChannel)?.send(message), { jitter: 'full' });
        } catch (error) {
            this.logger.error(`Failed to send message after multiple retries to channel ${channelId}: "${error.message}"`);
        }
    }
}

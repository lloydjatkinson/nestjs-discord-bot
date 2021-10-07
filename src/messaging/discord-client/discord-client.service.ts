import { Injectable, Logger, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Intents, TextChannel } from 'discord.js';

import { backOff } from 'exponential-backoff';

@Injectable()
export class DiscordClientService implements OnModuleInit {
    private readonly logger = new Logger(DiscordClientService.name);

    private readonly discordToken = this.configService.get<string>('DISCORD_TOKEN');
    private readonly discordIntents = this.configService.get<number>('DISCORD_INTENTS');
    private readonly discordBotLogChannelId = this.configService.get<string>('DISCORD_BOT_LOG_CHANNEL_ID');

    private discordClient: Client;

    constructor(private readonly configService: ConfigService) { }
    
    async onModuleInit() {
        this.logger.log('Creating Discord client...');
        
        if (!this.discordToken) throw new Error('Discord token must be configured to run this bot.');
        if (!this.discordIntents) throw new Error('Discord intents must be configured to run this bot.');

        const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

        client.login(this.discordToken);

        await client.once('ready', async (client) => {
            this.discordClient = client;
        });
    }

    async sendMessage(channelId: string, message: string) {
        this.logger.verbose(`Sending message to channel ${channelId}: ${message}`);
        try {
            await backOff(async () => await (this.discordClient?.channels.cache.get(channelId) as TextChannel)?.send(message), { jitter: 'full' });
           
        } catch (error) {
            this.logger.error(`Failed to send message after multiple retries to channel ${channelId}: "${error.message}"`);
        }
    }
}
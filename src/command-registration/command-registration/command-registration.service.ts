import { Injectable, Logger } from '@nestjs/common';

import { SlashCommandBuilder } from '@discordjs/builders';

import { DiscordClientService } from '../../discord-client/discord-client/discord-client.service';

@Injectable()
export class CommandRegistrationService {
    private readonly logger = new Logger(CommandRegistrationService.name);

    constructor(
        private readonly discordClientService: DiscordClientService
    ) { }

    public async registerCommand(slashCommand: SlashCommandBuilder) : Promise<void> {
        await this.discordClientService.registerCommand(slashCommand);
    }
}
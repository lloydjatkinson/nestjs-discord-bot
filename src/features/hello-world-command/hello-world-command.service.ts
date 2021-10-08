import { SlashCommandBuilder } from '@discordjs/builders';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandRegistrationService } from '../../command-registration/command-registration/command-registration.service';

import { DiscordMessagingService } from '../../discord-client/discord-messaging/discord-messaging.service';

@Injectable()
export class HelloWorldCommandService {
    private readonly logger = new Logger(HelloWorldCommandService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly commandRegistrationService: CommandRegistrationService,
        private readonly discordMessagingService: DiscordMessagingService,
    ) {
        this.setup();
    }

    public setup() {
        this.commandRegistrationService.registerCommand(
            new SlashCommandBuilder().setName('hello').setDescription('Replies with world!'),
        );
    }
}
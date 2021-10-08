import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordClientModule } from '../discord-client/discord-client.module';
import { CommandRegistrationService } from './command-registration/command-registration.service';

@Module({
    imports: [ConfigModule, DiscordClientModule],
    providers: [CommandRegistrationService]
})
export class CommandRegistrationModule {}
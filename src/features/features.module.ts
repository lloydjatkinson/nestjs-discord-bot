import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordClientModule } from '../discord-client/discord-client.module';
import { CommandRegistrationModule } from '../command-registration/command-registration.module';
import { HelloWorldCommandService } from './hello-world-command/hello-world-command.service';

@Module({
    imports: [ConfigModule, DiscordClientModule, CommandRegistrationModule],
    providers: [HelloWorldCommandService]
})
export class FeaturesModule {}
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordClientService } from './discord-client/discord-client.service';
import { CommonCommandsModule } from './common-commands/common-commands.module';
import { CommonQueriesModule } from './common-queries/common-queries.module';

@Module({
    providers: [DiscordClientService],
    imports: [ConfigModule, CommonCommandsModule, CommonQueriesModule]
})
export class DiscordModule {}
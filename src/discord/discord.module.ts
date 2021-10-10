import { Module } from '@nestjs/common';
import { DiscordClientService } from './discord-client/discord-client.service';
import { CommonCommandsModule } from './common-commands/common-commands.module';
import { CommonQueriesModule } from './common-queries/common-queries.module';

@Module({
    providers: [DiscordClientService],
    imports: [CommonCommandsModule, CommonQueriesModule]
})
export class DiscordModule {}
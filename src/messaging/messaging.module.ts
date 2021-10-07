import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordMessagingService } from './discord-messaging/discord-messaging.service';
import { DiscordClientService } from './discord-client/discord-client.service';

@Module({
    imports: [ConfigModule],
    providers: [DiscordMessagingService, DiscordClientService],
    exports: [DiscordMessagingService],
})
export class MessagingModule {}
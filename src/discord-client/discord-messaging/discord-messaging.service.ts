import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DiscordClientService } from '../discord-client/discord-client.service';

@Injectable()
export class DiscordMessagingService {
    private readonly logger = new Logger(DiscordMessagingService.name);

    constructor(
            private readonly configService: ConfigService,
            private readonly discordClientService: DiscordClientService
    ) { }
    
    public async sendMessage(channelId: string, message: string) {
        await this.discordClientService.sendMessage(channelId, message);
    }
}
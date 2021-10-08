import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DiscordClientModule } from '../discord-client/discord-client.module';
import { ScheduledFactsService } from './scheduled-facts/scheduled-facts.service';

@Module({
    imports: [ConfigModule, DiscordClientModule],
    providers: [ScheduledFactsService],
})
export class FactsModule {}
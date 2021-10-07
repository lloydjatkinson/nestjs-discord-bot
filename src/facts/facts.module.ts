import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingModule } from 'src/messaging/messaging.module';
import { ScheduledFactsService } from './scheduled-facts/scheduled-facts.service';

@Module({
    imports: [ConfigModule, MessagingModule],
    providers: [ScheduledFactsService],
})
export class FactsModule {}
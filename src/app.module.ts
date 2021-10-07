import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { MessagingModule } from './messaging/messaging.module';
import { FactsModule } from './facts/facts.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV || 'development'}` }),
        ScheduleModule.forRoot(),
        MessagingModule,
        FactsModule,
    ],
    providers: [AppService],
})
export class AppModule {}
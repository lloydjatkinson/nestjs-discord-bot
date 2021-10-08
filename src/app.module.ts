import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { FactsModule } from './facts/facts.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CommandsModule } from './commands/commands.module';
import { FeaturesModule } from './features/features.module';
import { CommandRegistrationModule } from './command-registration/command-registration.module';
import { CommandRegistrationModule } from './command-registration/command-registration.module';
import { CommandsModule } from './commands/commands.module';
import { CommandRegistrationService } from './command-registration/command-registration.service';
import { CommandsModule } from './commands/commands.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV || 'development'}` }),
        ScheduleModule.forRoot(),
        DiscordClientModule,
        FactsModule,
        CommandsModule,
        CommandRegistrationModule,
        FeaturesModule,
    ],
    providers: [AppService, CommandRegistrationService],
})
export class AppModule {}
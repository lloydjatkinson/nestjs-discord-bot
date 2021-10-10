import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { DiscordModule } from './discord/discord.module';
import { FeaturesModule } from './features/features.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
        }),
        DomainModule,
        DiscordModule,
        FeaturesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
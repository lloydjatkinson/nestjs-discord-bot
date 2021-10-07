import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { DiscordMessagingService } from 'src/messaging/discord-messaging/discord-messaging.service';

@Injectable()
export class ScheduledFactsService {
    private readonly logger = new Logger(ScheduledFactsService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly discordMessagingService: DiscordMessagingService,
    ) { }

    @Cron(CronExpression.EVERY_WEEK)
    handleCron() {
        const facts = [
            'Vue.js is a progressive framework for building user interfaces.',
            'Vue.js is designed to be incrementally adoptable. It is easy to pick up a new feature, and it is easy to adapt to new technologies and development environments.',
            'Vue.js is designed to be efficient. It uses only modern JavaScript, HTML and CSS features, and is based on the concept of reactive data.',
            'Vue.js is designed to be performant. It is written in JavaScript, and is compiled to JavaScript using Babel.',
            'Vue.js is designed to be extendable. It is easy to create reusable components, and it is easy to extend the framework with custom plugins.',
            'Vue.js is designed to be testable. It is easy to write unit tests for components and directives, and it is easy to write integration tests for the application.',
            'Vue.js is designed to be accessible. It has built-in accessibility features, and it is easy to customize the user interface to meet accessibility requirements.',
            // The above was created by GitHub copilot.
        ];

        this.discordMessagingService.sendMessage(this.configService.get('DISCORD_BOT_LOG_CHANNEL_ID'), facts[Math.floor(Math.random() * facts.length)]);
    }
}
import { Test, TestingModule } from '@nestjs/testing';
import { DiscordMessagingService } from './discord-messaging.service';

describe('DiscordMessagingService', () => {
    let service: DiscordMessagingService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DiscordMessagingService],
        }).compile();

        service = module.get<DiscordMessagingService>(DiscordMessagingService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
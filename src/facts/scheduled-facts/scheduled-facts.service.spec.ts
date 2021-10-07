import { Test, TestingModule } from '@nestjs/testing';
import { ScheduledFactsService } from './scheduled-facts.service';

describe('ScheduledFactsService', () => {
  let service: ScheduledFactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduledFactsService],
    }).compile();

    service = module.get<ScheduledFactsService>(ScheduledFactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

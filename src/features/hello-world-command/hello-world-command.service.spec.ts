import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldCommandService } from './hello-world-command.service';

describe('HelloWorldCommandService', () => {
  let service: HelloWorldCommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloWorldCommandService],
    }).compile();

    service = module.get<HelloWorldCommandService>(HelloWorldCommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

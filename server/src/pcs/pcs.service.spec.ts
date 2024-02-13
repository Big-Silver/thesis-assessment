import { Test, TestingModule } from '@nestjs/testing';
import { PcsService } from './pcs.service';

describe('PcsService', () => {
  let service: PcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcsService],
    }).compile();

    service = module.get<PcsService>(PcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

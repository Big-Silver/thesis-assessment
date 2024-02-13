import { Test, TestingModule } from '@nestjs/testing';
import { PcsController } from './pcs.controller';
import { PcsService } from './pcs.service';

describe('PcsController', () => {
  let controller: PcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcsController],
      providers: [PcsService],
    }).compile();

    controller = module.get<PcsController>(PcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

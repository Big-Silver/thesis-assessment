import { Module } from '@nestjs/common';
import { PcsService } from './pcs.service';
import { PcsController } from './pcs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pc } from './entities/pc.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pc])],
  controllers: [PcsController],
  providers: [PcsService],
})
export class PcsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { PcsModule } from './pcs/pcs.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), PcsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

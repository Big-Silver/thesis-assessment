import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import * as csvParser from 'csv-parser';
import { Readable } from 'stream';
import { PcsService } from './pcs.service';
import { Pc } from './entities/pc.entity';
import { UpdatePcDto } from './dto/update-pc.dto';

@Controller('pcs')
export class PcsController {
  constructor(private readonly pcsService: PcsService) {}

  @Post('/upload_file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Multer.File,
  ): Promise<{ message: string; statusCode: number }> {
    try {
      const pcs = await this.parseCsvData(file.buffer);
      await this.pcsService.uploadComputersFromCsv(pcs);
      return {
        message: 'Upload successful',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }

  async parseCsvData(fileBuffer: Buffer): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const computers: any[] = [];

      // Create a readable stream from the buffer
      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null); // Mark the end of the stream

      // Create a CSV parser
      const parser = csvParser();

      // Parse the CSV data from the stream
      const csvStream = bufferStream.pipe(parser);

      csvStream
        .on('data', (data) => {
          computers.push(data);
        })
        .on('end', () => {
          resolve(computers);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  @Get('get_pc_by_id/:id')
  async getPcById(@Param('id') id: number): Promise<any> {
    try {
      const pc = await this.pcsService.getPcById(id);
      if (!pc) {
        throw new NotFoundException(`Pc with ID ${id} not found`);
      }
      return pc;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch Pc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/get_all_pcs')
  async findAll(
    @Query('keyword') keyword?: string,
    @Query('pageNo') page: number = 1,
    @Query('pageSize') limit: number = 10,
  ): Promise<{ pcs: Pc[]; totalItems: number; totalPages: number }> {
    if (page < 1) {
      throw new BadRequestException(
        'Page number must be greater than or equal to 1.',
      );
    }

    try {
      const result = await this.pcsService.findAll(keyword, page, limit);

      if (result.pcs.length === 0) {
        throw new NotFoundException('No record found.');
      }

      return result;
    } catch (error) {
      throw new HttpException(
        `Error while fetching computers: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put('update_pc_by_id/:id')
  async updatePc(
    @Param('id') id: number,
    @Body() updatePcDto: UpdatePcDto,
  ): Promise<Pc> {
    try {
      // Call editPc method from the service to update the Pc entity
      const updatedPc = await this.pcsService.editPc(id, updatePcDto);

      // Return the updated Pc entity to the client
      return updatedPc;
    } catch (error) {
      // If an error occurs during the update operation, throw an internal server error
      throw new HttpException(
        'Failed to update Pc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete_pc_by_id/:id')
  async deletePc(
    @Param('id') id: number,
  ): Promise<{ message: string; statusCode: number }> {
    try {
      const pc = await this.pcsService.getPcById(id);
      if (!pc) {
        throw new NotFoundException(`Pc with ID ${id} not found`);
      }
      await this.pcsService.deletePc(id);
      return { message: 'Pc deleted successfully', statusCode: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        'Failed to delete Pc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

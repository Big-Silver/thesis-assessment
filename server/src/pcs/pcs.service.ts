import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Repository } from 'typeorm';
import { Pc } from './entities/pc.entity';

@Injectable()
export class PcsService {
  constructor(
    @InjectRepository(Pc)
    private pcRepository: Repository<Pc>,
  ) {}

  async uploadComputersFromCsv(
    csvData: any[],
  ): Promise<{ message: string; statusCode: number }> {
    const computers: Partial<Pc>[] = [];

    // Iterate over each row of the CSV data
    for (const data of csvData) {
      // Create a partial Computer object with the extracted properties from the CSV data
      const computer: Partial<Pc> = {
        ram: data['8 GB'],
        storage_type: data['1 TB SSD'],
        storage_capacity: data['1 TB SSD'],
        usb_ports: data['2 x USB 3.0, 4 x USB 2.0'],
        gpu: data['NVIDIA GeForce GTX 770'],
        weight: data['8.1 kg'],
        psu_wattage: data['500 W PSU'],
        processor: data['Intel® Celeron™ N3050 Processor'],
      };

      // Push the partial Computer object to the array
      computers.push(computer);
    }

    // Call bulkCreate to save the computers to the database
    await this.bulkCreate(computers);

    return {
      message: 'Pc uploaded successfully.',
      statusCode: HttpStatus.OK,
    };
  }

  async bulkCreate(computers: Partial<Pc>[]): Promise<void> {
    await this.pcRepository.save(computers);
  }

  async findAll(
    keyword: string | undefined,
    page: number,
    pageSize: number,
  ): Promise<{ pcs: Pc[]; totalItems: number; totalPages: number }> {
    try {
      let whereCondition: any = {};

      if (keyword) {
        whereCondition = [
          { processor: ILike(`%${keyword}%`) },
          { gpu: ILike(`%${keyword}%`) },
        ];
      }

      const [pcs, totalItems] = await this.pcRepository.findAndCount({
        where: whereCondition,
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      if (pcs.length === 0) {
        throw new HttpException(
          'No records found for the given search term',
          HttpStatus.NOT_FOUND,
        );
      }

      const totalPages = Math.ceil(totalItems / pageSize);

      return {
        pcs,
        totalItems,
        totalPages,
      };
    } catch (error) {
      throw new HttpException(
        `Error while retrieving computers: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editPc(computerId: number, updatedPcData: Partial<Pc>): Promise<Pc> {
    try {
      // Fetch the Pc entity by ID
      const pc = await this.getPcById(computerId);

      // Merge the updated data into the existing Pc entity
      Object.assign(pc, updatedPcData);

      // Save the updated Pc entity
      return await this.pcRepository.save(pc);
    } catch (error) {
      throw new HttpException(
        'Failed to update Pc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPcById(computerId: number): Promise<Pc> {
    try {
      // Define the options to retrieve only required fields
      const options: FindOneOptions<Pc> = {
        where: { computer_id: computerId },
        select: [
          'computer_id',
          'ram',
          'storage_type',
          'storage_capacity',
          'usb_ports',
          'gpu',
          'weight',
          'psu_wattage',
          'processor',
        ],
      };

      // Fetch the Pc entity using findOne method with options
      const pc = await this.pcRepository.findOne(options);

      // If Pc entity not found, throw NotFoundException
      if (!pc) {
        throw new NotFoundException(`Pc with ID ${computerId} not found`);
      }

      return pc;
    } catch (error) {
      // If any error occurs, throw HttpException with appropriate status
      throw new HttpException('Failed to fetch Pc by ID', HttpStatus.NOT_FOUND);
    }
  }

  async deletePc(id: number): Promise<void> {
    try {
      await this.pcRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete Pc',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePcDto {
  @IsString()
  @IsNotEmpty()
  ram: string;

  @IsString()
  @IsNotEmpty()
  storage_type: string;

  @IsString()
  @IsNotEmpty()
  storage_capacity: string;

  @IsString()
  @IsNotEmpty()
  usb_ports: string;

  @IsString()
  @IsNotEmpty()
  gpu: string;

  @IsString()
  @IsNotEmpty()
  weight: string;

  @IsString()
  @IsNotEmpty()
  psu_wattage: string;

  @IsString()
  @IsNotEmpty()
  processor: string;
}

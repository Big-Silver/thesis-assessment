import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pc {
  @PrimaryGeneratedColumn()
  computer_id: number;

  @Column({ type: 'varchar' })
  ram: string;

  @Column()
  storage_type: string;

  @Column()
  storage_capacity: string;

  @Column({ type: 'varchar' })
  usb_ports: string;

  @Column()
  gpu: string;

  @Column({ type: 'varchar' })
  weight: string;

  @Column({ type: 'varchar' })
  psu_wattage: string;

  @Column()
  processor: string;
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class VarCharAdded1707673549097 implements MigrationInterface {
    name = 'VarCharAdded1707673549097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "usb_ports"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "usb_ports" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "weight" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "psu_wattage"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "psu_wattage" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "psu_wattage"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "psu_wattage" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "weight" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "usb_ports"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "usb_ports" integer NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class VarCharAddedToRam1707673430266 implements MigrationInterface {
    name = 'VarCharAddedToRam1707673430266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "ram"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "ram" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "ram"`);
        await queryRunner.query(`ALTER TABLE "pc" ADD "ram" integer NOT NULL`);
    }

}

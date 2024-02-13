import { MigrationInterface, QueryRunner } from "typeorm";

export class EmailAdded1707673280382 implements MigrationInterface {
    name = 'EmailAdded1707673280382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pc" ADD CONSTRAINT "UQ_b202b74947f06df05c3734da9f1" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pc" DROP CONSTRAINT "UQ_b202b74947f06df05c3734da9f1"`);
        await queryRunner.query(`ALTER TABLE "pc" DROP COLUMN "email"`);
    }

}

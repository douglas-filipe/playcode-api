import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableToken1645649576697 implements MigrationInterface {
    name = 'CreateTableToken1645649576697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD "token" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD "user_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "UQ_e50ca89d635960fda2ffeb17639" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "UQ_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "token"`);
    }

}

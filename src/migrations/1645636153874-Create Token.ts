import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateToken1645636153874 implements MigrationInterface {
    name = 'CreateToken1645636153874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "subscribers"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "img" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "img"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "subscribers" integer DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}

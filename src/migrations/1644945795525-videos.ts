import {MigrationInterface, QueryRunner} from "typeorm";

export class videos1644945795525 implements MigrationInterface {
    name = 'videos1644945795525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "thumburl" character varying NOT NULL, "videourl" character varying NOT NULL, "videokey" character varying NOT NULL, "views" integer NOT NULL, "tumbkey" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "video"`);
    }

}

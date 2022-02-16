import {MigrationInterface, QueryRunner} from "typeorm";

export class videos1645030434794 implements MigrationInterface {
    name = 'videos1645030434794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "thumburl" character varying NOT NULL, "videourl" character varying NOT NULL, "videokey" character varying NOT NULL, "views" integer, "tumbkey" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "videos"`);
    }

}

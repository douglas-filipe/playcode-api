import {MigrationInterface, QueryRunner} from "typeorm";

export class likeVideosUpdate1645216384476 implements MigrationInterface {
    name = 'likeVideosUpdate1645216384476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "video" ADD "updatedOn" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "updatedOn"`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "createdOn"`);
    }

}

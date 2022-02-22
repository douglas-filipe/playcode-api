import {MigrationInterface, QueryRunner} from "typeorm";

export class alterTableVideos1645214153176 implements MigrationInterface {
    name = 'alterTableVideos1645214153176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" ADD "likes" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "likes"`);
    }

}

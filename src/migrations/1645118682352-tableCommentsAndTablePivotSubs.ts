import {MigrationInterface, QueryRunner} from "typeorm";

export class tableCommentsAndTablePivotSubs1645118682352 implements MigrationInterface {
    name = 'tableCommentsAndTablePivotSubs1645118682352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "video_id" uuid`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "video_id"`);
    }

}

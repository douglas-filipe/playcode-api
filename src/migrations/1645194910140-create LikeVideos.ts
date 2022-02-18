import {MigrationInterface, QueryRunner} from "typeorm";

export class createLikeVideos1645194910140 implements MigrationInterface {
    name = 'createLikeVideos1645194910140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likesvideos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "video_id" uuid NOT NULL, CONSTRAINT "REL_cd41f5d16312d5af3f3c00dd9a" UNIQUE ("user_id"), CONSTRAINT "PK_8ac0498416aacb0db6815643ade" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_1f785e490613616e05e2be98d66" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_1f785e490613616e05e2be98d66"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`DROP TABLE "likesvideos"`);
    }

}

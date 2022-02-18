import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableLike1645211887474 implements MigrationInterface {
    name = 'createTableLike1645211887474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4"`);
        await queryRunner.query(`CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "thumburl" character varying NOT NULL, "videourl" character varying NOT NULL, "videokey" character varying NOT NULL, "views" integer, "tumbkey" character varying NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likesvideos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "video_id" uuid NOT NULL, CONSTRAINT "REL_cd41f5d16312d5af3f3c00dd9a" UNIQUE ("user_id"), CONSTRAINT "PK_8ac0498416aacb0db6815643ade" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_1f785e490613616e05e2be98d66" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_1f785e490613616e05e2be98d66"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4"`);
        await queryRunner.query(`DROP TABLE "likesvideos"`);
        await queryRunner.query(`DROP TABLE "video"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

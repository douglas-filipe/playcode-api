import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableTags1645450445962 implements MigrationInterface {
    name = 'createTableTags1645450445962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "video" ADD "channelId" uuid`);
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "views" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "REL_cd41f5d16312d5af3f3c00dd9a"`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "REL_cd41f5d16312d5af3f3c00dd9a" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ALTER COLUMN "views" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "channelId"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}

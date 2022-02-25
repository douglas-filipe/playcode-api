import {MigrationInterface, QueryRunner} from "typeorm";

export class cascadeTables1645795001249 implements MigrationInterface {
    name = 'cascadeTables1645795001249'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_1f785e490613616e05e2be98d66"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b"`);
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117"`);
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_58c21d1b171a2092a0e8c300282"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4"`);
        await queryRunner.query(`ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd"`);
        await queryRunner.query(`ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_5d168475fa9da17e9eb6092795b"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_1f785e490613616e05e2be98d66" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_58c21d1b171a2092a0e8c300282" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_5d168475fa9da17e9eb6092795b" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_5d168475fa9da17e9eb6092795b"`);
        await queryRunner.query(`ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_58c21d1b171a2092a0e8c300282"`);
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117"`);
        await queryRunner.query(`ALTER TABLE "video" DROP CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_1f785e490613616e05e2be98d66"`);
        await queryRunner.query(`ALTER TABLE "likesvideos" DROP CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1"`);
        await queryRunner.query(`ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_5d168475fa9da17e9eb6092795b" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0528681f0d2c6e89116dd3eb3f4" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_58c21d1b171a2092a0e8c300282" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "video" ADD CONSTRAINT "FK_2edd2d5b91d15d5262356ab2a5b" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_cd41f5d16312d5af3f3c00dd9a1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likesvideos" ADD CONSTRAINT "FK_1f785e490613616e05e2be98d66" FOREIGN KEY ("video_id") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

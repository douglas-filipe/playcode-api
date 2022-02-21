import {MigrationInterface, QueryRunner} from "typeorm";

export class tableLikesComments1645469515359 implements MigrationInterface {
    name = 'tableLikesComments1645469515359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likescomments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "comment_id" uuid NOT NULL, CONSTRAINT "PK_6f22bb7de0985eb5124a5b74655" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD "likes" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likescomments" ADD CONSTRAINT "FK_58c21d1b171a2092a0e8c300282" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_58c21d1b171a2092a0e8c300282"`);
        await queryRunner.query(`ALTER TABLE "likescomments" DROP CONSTRAINT "FK_702fd4d96b3ebbe23ebcf413117"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "likes"`);
        await queryRunner.query(`DROP TABLE "likescomments"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class commentslikes1645470187456 implements MigrationInterface {
  name = "commentslikes1645470187456";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "videos"`);
    await queryRunner.query(
      `CREATE TABLE "commentslikes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userid" character varying NOT NULL, "commentid" character varying NOT NULL, "user_id" uuid, "comment_id" uuid, CONSTRAINT "PK_40f6fd1514156b8d7801c802071" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "commentslikes" ADD CONSTRAINT "FK_5d168475fa9da17e9eb6092795b" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_5d168475fa9da17e9eb6092795b"`
    );
    await queryRunner.query(
      `ALTER TABLE "commentslikes" DROP CONSTRAINT "FK_a1c7e61884906a74d16c4a1adfd"`
    );
    await queryRunner.query(`DROP TABLE "commentslikes"`);
  }
}

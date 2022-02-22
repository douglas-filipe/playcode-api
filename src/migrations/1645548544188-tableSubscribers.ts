import {MigrationInterface, QueryRunner} from "typeorm";

export class tableSubscribers1645548544188 implements MigrationInterface {
    name = 'tableSubscribers1645548544188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "channelId" uuid NOT NULL, CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "subscribers" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "subscribers" ADD CONSTRAINT "FK_3e82da94a504e2d6dff5c9f393f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscribers" ADD CONSTRAINT "FK_b61901c48abb4f60d45e82edbee" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscribers" DROP CONSTRAINT "FK_b61901c48abb4f60d45e82edbee"`);
        await queryRunner.query(`ALTER TABLE "subscribers" DROP CONSTRAINT "FK_3e82da94a504e2d6dff5c9f393f"`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "subscribers"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class tableToken1645707124267 implements MigrationInterface {
    name = 'tableToken1645707124267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "REL_e50ca89d635960fda2ffeb1763" UNIQUE ("user_id"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "subscribers"`);
        await queryRunner.query(`ALTER TABLE "room" ADD "img" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_e50ca89d635960fda2ffeb17639" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_e50ca89d635960fda2ffeb17639"`);
        await queryRunner.query(`ALTER TABLE "room" DROP COLUMN "img"`);
        await queryRunner.query(`ALTER TABLE "channel" ADD "subscribers" integer DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE "token"`);
    }

}

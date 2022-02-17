import {MigrationInterface, QueryRunner} from "typeorm";

export class tableComments1645109461605 implements MigrationInterface {
    name = 'tableComments1645109461605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "user_id" TO "userId"`);
        await queryRunner.query(`CREATE TABLE "subscribers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_cbe0a7a9256c826f403c0236b67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "userId" ("subscribersId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_5d3e963c44688be2a98f55e964a" PRIMARY KEY ("subscribersId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af33ae8327557827b6ad7cee06" ON "userId" ("subscribersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af14d6b8bfbbf2a0104091c012" ON "userId" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "channelId" ("subscribersId" uuid NOT NULL, "channelId" uuid NOT NULL, CONSTRAINT "PK_44201b1c68dbb665f8b4387f0a7" PRIMARY KEY ("subscribersId", "channelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6f95be29c0553781d2a7a4410" ON "channelId" ("subscribersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_de7c44f5c49bbc22a05dbbdfd0" ON "channelId" ("channelId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "userId" ADD CONSTRAINT "FK_af33ae8327557827b6ad7cee06f" FOREIGN KEY ("subscribersId") REFERENCES "subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "userId" ADD CONSTRAINT "FK_af14d6b8bfbbf2a0104091c0124" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "channelId" ADD CONSTRAINT "FK_a6f95be29c0553781d2a7a44104" FOREIGN KEY ("subscribersId") REFERENCES "subscribers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "channelId" ADD CONSTRAINT "FK_de7c44f5c49bbc22a05dbbdfd07" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channelId" DROP CONSTRAINT "FK_de7c44f5c49bbc22a05dbbdfd07"`);
        await queryRunner.query(`ALTER TABLE "channelId" DROP CONSTRAINT "FK_a6f95be29c0553781d2a7a44104"`);
        await queryRunner.query(`ALTER TABLE "userId" DROP CONSTRAINT "FK_af14d6b8bfbbf2a0104091c0124"`);
        await queryRunner.query(`ALTER TABLE "userId" DROP CONSTRAINT "FK_af33ae8327557827b6ad7cee06f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de7c44f5c49bbc22a05dbbdfd0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6f95be29c0553781d2a7a4410"`);
        await queryRunner.query(`DROP TABLE "channelId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af14d6b8bfbbf2a0104091c012"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af33ae8327557827b6ad7cee06"`);
        await queryRunner.query(`DROP TABLE "userId"`);
        await queryRunner.query(`DROP TABLE "subscribers"`);
        await queryRunner.query(`ALTER TABLE "comments" RENAME COLUMN "userId" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

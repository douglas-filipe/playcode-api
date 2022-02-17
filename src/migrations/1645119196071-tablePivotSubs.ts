import {MigrationInterface, QueryRunner} from "typeorm";

export class tablePivotSubs1645119196071 implements MigrationInterface {
    name = 'tablePivotSubs1645119196071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "channel_subs_users" ("channelId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_3b0fb7ad7db86de1aba0cd5f63d" PRIMARY KEY ("channelId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5e5850d99d240e3e3acfc54b57" ON "channel_subs_users" ("channelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_094d0ad85c654aecfac46e9e00" ON "channel_subs_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "users_subs_channel" ("usersId" uuid NOT NULL, "channelId" uuid NOT NULL, CONSTRAINT "PK_3a8e8c396d4c45dadaf30464722" PRIMARY KEY ("usersId", "channelId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e3e5c3d47a909f7d84b8d6357" ON "users_subs_channel" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eb5e0d97185524657b215168b2" ON "users_subs_channel" ("channelId") `);
        await queryRunner.query(`ALTER TABLE "channel_subs_users" ADD CONSTRAINT "FK_5e5850d99d240e3e3acfc54b57e" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "channel_subs_users" ADD CONSTRAINT "FK_094d0ad85c654aecfac46e9e005" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_subs_channel" ADD CONSTRAINT "FK_0e3e5c3d47a909f7d84b8d63570" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_subs_channel" ADD CONSTRAINT "FK_eb5e0d97185524657b215168b22" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_subs_channel" DROP CONSTRAINT "FK_eb5e0d97185524657b215168b22"`);
        await queryRunner.query(`ALTER TABLE "users_subs_channel" DROP CONSTRAINT "FK_0e3e5c3d47a909f7d84b8d63570"`);
        await queryRunner.query(`ALTER TABLE "channel_subs_users" DROP CONSTRAINT "FK_094d0ad85c654aecfac46e9e005"`);
        await queryRunner.query(`ALTER TABLE "channel_subs_users" DROP CONSTRAINT "FK_5e5850d99d240e3e3acfc54b57e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eb5e0d97185524657b215168b2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e3e5c3d47a909f7d84b8d6357"`);
        await queryRunner.query(`DROP TABLE "users_subs_channel"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_094d0ad85c654aecfac46e9e00"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e5850d99d240e3e3acfc54b57"`);
        await queryRunner.query(`DROP TABLE "channel_subs_users"`);
    }

}

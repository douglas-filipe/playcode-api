import {MigrationInterface, QueryRunner} from "typeorm";

export class tableChannelVideo1645041289550 implements MigrationInterface {
    name = 'tableChannelVideo1645041289550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "channelId" uuid`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_16909a0ae1ace805503fe874dde" FOREIGN KEY ("channelId") REFERENCES "channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_16909a0ae1ace805503fe874dde"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "channelId"`);
    }

}

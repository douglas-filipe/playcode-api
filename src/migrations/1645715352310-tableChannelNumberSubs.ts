import {MigrationInterface, QueryRunner} from "typeorm";

export class tableChannelNumberSubs1645715352310 implements MigrationInterface {
    name = 'tableChannelNumberSubs1645715352310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" ADD "subsNumber" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "channel" DROP COLUMN "subsNumber"`);
    }

}

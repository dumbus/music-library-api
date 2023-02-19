import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676817035391 implements MigrationInterface {
    name = 'init1676817035391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" bigint NOT NULL, "updatedAt" bigint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duration" integer NOT NULL, "artistId" uuid, "albumId" uuid, CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteAlbum" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "albumId" uuid, CONSTRAINT "PK_577a79bacac3d3991adc9c1fcd7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteArtist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "artistId" uuid NOT NULL, CONSTRAINT "REL_921b7851e32908f3aadcc1994d" UNIQUE ("artistId"), CONSTRAINT "PK_1b10f4864cb29b168b27a3e4be3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favoriteTrack" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "trackId" uuid NOT NULL, CONSTRAINT "REL_c750d3de3e63cf85af01ca9bcf" UNIQUE ("trackId"), CONSTRAINT "PK_4a41e92f44d671422a17faf65fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteAlbum" ADD CONSTRAINT "FK_ad9847ca819fe0d79c4c8045c12" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteArtist" ADD CONSTRAINT "FK_921b7851e32908f3aadcc1994df" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favoriteTrack" ADD CONSTRAINT "FK_c750d3de3e63cf85af01ca9bcf5" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoriteTrack" DROP CONSTRAINT "FK_c750d3de3e63cf85af01ca9bcf5"`);
        await queryRunner.query(`ALTER TABLE "favoriteArtist" DROP CONSTRAINT "FK_921b7851e32908f3aadcc1994df"`);
        await queryRunner.query(`ALTER TABLE "favoriteAlbum" DROP CONSTRAINT "FK_ad9847ca819fe0d79c4c8045c12"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`);
        await queryRunner.query(`ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`);
        await queryRunner.query(`ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`);
        await queryRunner.query(`DROP TABLE "favoriteTrack"`);
        await queryRunner.query(`DROP TABLE "favoriteArtist"`);
        await queryRunner.query(`DROP TABLE "favoriteAlbum"`);
        await queryRunner.query(`DROP TABLE "track"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "artist"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

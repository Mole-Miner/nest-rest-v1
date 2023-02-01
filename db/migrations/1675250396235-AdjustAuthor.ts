import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustAuthor1675250396235 implements MigrationInterface {
  name = 'AdjustAuthor1675250396235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "age" integer, "birthday" date, "nationality" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_author"("id", "age", "birthday", "nationality") SELECT "id", "age", "birthday", "nationality" FROM "author"`,
    );
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_author" RENAME TO "author"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "age" integer, "birthday" date, "nationality" varchar, "firstname" varchar NOT NULL, "lastname" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_author"("id", "age", "birthday", "nationality") SELECT "id", "age", "birthday", "nationality" FROM "author"`,
    );
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_author" RENAME TO "author"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "author" RENAME TO "temporary_author"`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "age" integer, "birthday" date, "nationality" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "author"("id", "age", "birthday", "nationality") SELECT "id", "age", "birthday", "nationality" FROM "temporary_author"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_author"`);
    await queryRunner.query(
      `ALTER TABLE "author" RENAME TO "temporary_author"`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer, "birthday" date, "nationality" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "author"("id", "age", "birthday", "nationality") SELECT "id", "age", "birthday", "nationality" FROM "temporary_author"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_author"`);
  }
}

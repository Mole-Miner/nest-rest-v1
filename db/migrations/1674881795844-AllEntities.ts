import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllEntities1674881795844 implements MigrationInterface {
  name = 'AllEntities1674881795844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genre" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "overview" varchar, "pages" integer, "authorId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer, "birthday" varchar, "nationality" varchar)`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, PRIMARY KEY ("bookId", "genreId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "overview" varchar, "pages" integer, "authorId" integer, CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_book"("id", "title", "overview", "pages", "authorId") SELECT "id", "title", "overview", "pages", "authorId" FROM "book"`,
    );
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`ALTER TABLE "temporary_book" RENAME TO "book"`);
    await queryRunner.query(`DROP INDEX "IDX_31d658e0af554165f4598158c5"`);
    await queryRunner.query(`DROP INDEX "IDX_83bd32782d44d9db3d68c3f58c"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, CONSTRAINT "FK_31d658e0af554165f4598158c55" FOREIGN KEY ("bookId") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_83bd32782d44d9db3d68c3f58c1" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("bookId", "genreId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_book_genres_genre"("bookId", "genreId") SELECT "bookId", "genreId" FROM "book_genres_genre"`,
    );
    await queryRunner.query(`DROP TABLE "book_genres_genre"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_book_genres_genre" RENAME TO "book_genres_genre"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_83bd32782d44d9db3d68c3f58c"`);
    await queryRunner.query(`DROP INDEX "IDX_31d658e0af554165f4598158c5"`);
    await queryRunner.query(
      `ALTER TABLE "book_genres_genre" RENAME TO "temporary_book_genres_genre"`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_genres_genre" ("bookId" integer NOT NULL, "genreId" integer NOT NULL, PRIMARY KEY ("bookId", "genreId"))`,
    );
    await queryRunner.query(
      `INSERT INTO "book_genres_genre"("bookId", "genreId") SELECT "bookId", "genreId" FROM "temporary_book_genres_genre"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_book_genres_genre"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_83bd32782d44d9db3d68c3f58c" ON "book_genres_genre" ("genreId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31d658e0af554165f4598158c5" ON "book_genres_genre" ("bookId") `,
    );
    await queryRunner.query(`ALTER TABLE "book" RENAME TO "temporary_book"`);
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "overview" varchar, "pages" integer, "authorId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "book"("id", "title", "overview", "pages", "authorId") SELECT "id", "title", "overview", "pages", "authorId" FROM "temporary_book"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_book"`);
    await queryRunner.query(`DROP INDEX "IDX_83bd32782d44d9db3d68c3f58c"`);
    await queryRunner.query(`DROP INDEX "IDX_31d658e0af554165f4598158c5"`);
    await queryRunner.query(`DROP TABLE "book_genres_genre"`);
    await queryRunner.query(`DROP TABLE "author"`);
    await queryRunner.query(`DROP TABLE "book"`);
    await queryRunner.query(`DROP TABLE "genre"`);
  }
}

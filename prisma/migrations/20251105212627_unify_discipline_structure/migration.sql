/*
  Warnings:

  - You are about to drop the column `heroImage` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `heroTitle` on the `Discipline` table. All the data in the column will be lost.
  - You are about to drop the column `sections` on the `Discipline` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lenses` to the `Discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Discipline` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Discipline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lenses" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Discipline" ("createdAt", "description", "id", "name", "slug", "updatedAt") SELECT "createdAt", "description", "id", "name", "slug", "updatedAt" FROM "Discipline";
DROP TABLE "Discipline";
ALTER TABLE "new_Discipline" RENAME TO "Discipline";
CREATE UNIQUE INDEX "Discipline_slug_key" ON "Discipline"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

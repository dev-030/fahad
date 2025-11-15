/*
  Warnings:

  - You are about to drop the column `slug` on the `Coach` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "specialties" TEXT,
    "achievements" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Coach" ("achievements", "bio", "createdAt", "id", "image", "name", "specialties", "updatedAt") SELECT "achievements", "bio", "createdAt", "id", "image", "name", "specialties", "updatedAt" FROM "Coach";
DROP TABLE "Coach";
ALTER TABLE "new_Coach" RENAME TO "Coach";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

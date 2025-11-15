-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CoachLens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "landingPageId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CoachLens_landingPageId_fkey" FOREIGN KEY ("landingPageId") REFERENCES "LandingPage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CoachLens" ("createdAt", "id", "subtitle", "title", "updatedAt") SELECT "createdAt", "id", "subtitle", "title", "updatedAt" FROM "CoachLens";
DROP TABLE "CoachLens";
ALTER TABLE "new_CoachLens" RENAME TO "CoachLens";
CREATE UNIQUE INDEX "CoachLens_title_key" ON "CoachLens"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

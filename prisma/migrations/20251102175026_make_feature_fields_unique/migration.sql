/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FeatureDiscipline` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[text]` on the table `GymFeature` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FeatureDiscipline_name_key" ON "FeatureDiscipline"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GymFeature_text_key" ON "GymFeature"("text");

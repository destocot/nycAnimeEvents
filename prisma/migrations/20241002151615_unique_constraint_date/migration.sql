/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `dates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dates_date_key" ON "dates"("date");

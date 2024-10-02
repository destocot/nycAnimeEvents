/*
  Warnings:

  - The primary key for the `event_dates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `event_date_id` on the `event_dates` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event_dates" (
    "event_id" TEXT NOT NULL,
    "date_id" INTEGER NOT NULL,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("event_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "event_dates_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates" ("date_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_event_dates" ("date_id", "event_id") SELECT "date_id", "event_id" FROM "event_dates";
DROP TABLE "event_dates";
ALTER TABLE "new_event_dates" RENAME TO "event_dates";
CREATE UNIQUE INDEX "event_dates_event_id_date_id_key" ON "event_dates"("event_id", "date_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

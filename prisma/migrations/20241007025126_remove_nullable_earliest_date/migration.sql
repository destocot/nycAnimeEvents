/*
  Warnings:

  - Made the column `earliest_date` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "event_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "earliest_date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "contact" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_events" ("contact", "created_at", "description", "earliest_date", "event_id", "image", "is_approved", "source", "title", "updated_at") SELECT "contact", "created_at", "description", "earliest_date", "event_id", "image", "is_approved", "source", "title", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `contact` on the `events` table. All the data in the column will be lost.

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
    "is_approved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_events" ("created_at", "description", "earliest_date", "event_id", "image", "is_approved", "source", "title", "updated_at") SELECT "created_at", "description", "earliest_date", "event_id", "image", "is_approved", "source", "title", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

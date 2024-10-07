/*
  Warnings:

  - You are about to drop the `queued_event_dates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `queued_events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "queued_event_dates";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "queued_events";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "event_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "earliest_date" DATETIME,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "contact" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_events" ("created_at", "description", "earliest_date", "event_id", "image", "source", "title", "updated_at") SELECT "created_at", "description", "earliest_date", "event_id", "image", "source", "title", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

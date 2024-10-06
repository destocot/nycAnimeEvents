-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event_dates" (
    "date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("event_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_event_dates" ("created_at", "date", "date_id", "event_id", "updated_at") SELECT "created_at", "date", "date_id", "event_id", "updated_at" FROM "event_dates";
DROP TABLE "event_dates";
ALTER TABLE "new_event_dates" RENAME TO "event_dates";
CREATE TABLE "new_queued_event_dates" (
    "queued_date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "queued_event_id" TEXT NOT NULL,
    CONSTRAINT "queued_event_dates_queued_event_id_fkey" FOREIGN KEY ("queued_event_id") REFERENCES "queued_events" ("queued_event_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_queued_event_dates" ("created_at", "date", "queued_date_id", "queued_event_id", "updated_at") SELECT "created_at", "date", "queued_date_id", "queued_event_id", "updated_at" FROM "queued_event_dates";
DROP TABLE "queued_event_dates";
ALTER TABLE "new_queued_event_dates" RENAME TO "queued_event_dates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

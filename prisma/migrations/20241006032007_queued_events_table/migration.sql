-- CreateTable
CREATE TABLE "queued_events" (
    "queued_event_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_event_dates" (
    "date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "event_id" TEXT NOT NULL,
    "queued_event_id" TEXT,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("event_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "event_dates_queued_event_id_fkey" FOREIGN KEY ("queued_event_id") REFERENCES "queued_events" ("queued_event_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_event_dates" ("created_at", "date", "date_id", "event_id", "updated_at") SELECT "created_at", "date", "date_id", "event_id", "updated_at" FROM "event_dates";
DROP TABLE "event_dates";
ALTER TABLE "new_event_dates" RENAME TO "event_dates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

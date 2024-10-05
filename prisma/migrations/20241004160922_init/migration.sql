-- CreateTable
CREATE TABLE "events" (
    "event_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "earliest_date" DATETIME,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "event_dates" (
    "date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("event_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

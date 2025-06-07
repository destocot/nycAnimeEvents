-- DropTable
DROP TABLE IF EXISTS "event_dates";

-- DropTable
DROP TABLE IF EXISTS "events";

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "is_approved" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "event_dates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

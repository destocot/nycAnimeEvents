-- CreateTable
CREATE TABLE "events" (
    "event_id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT
);

-- CreateTable
CREATE TABLE "event_dates" (
    "event_date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "event_id" TEXT NOT NULL,
    "date_id" INTEGER NOT NULL,
    CONSTRAINT "event_dates_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events" ("event_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "event_dates_date_id_fkey" FOREIGN KEY ("date_id") REFERENCES "dates" ("date_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "dates" (
    "date_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "event_dates_event_id_date_id_key" ON "event_dates"("event_id", "date_id");

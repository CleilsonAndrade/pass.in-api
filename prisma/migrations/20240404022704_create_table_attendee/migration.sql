-- CreateTable
CREATE TABLE "tb_attendee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "tb_attendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "tb_event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

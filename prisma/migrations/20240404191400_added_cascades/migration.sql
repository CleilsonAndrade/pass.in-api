-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tb_attendee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_id" TEXT NOT NULL,
    CONSTRAINT "tb_attendee_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "tb_event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tb_attendee" ("created_at", "email", "event_id", "id", "name") SELECT "created_at", "email", "event_id", "id", "name" FROM "tb_attendee";
DROP TABLE "tb_attendee";
ALTER TABLE "new_tb_attendee" RENAME TO "tb_attendee";
CREATE UNIQUE INDEX "tb_attendee_event_id_email_key" ON "tb_attendee"("event_id", "email");
CREATE TABLE "new_tb_check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id" INTEGER NOT NULL,
    CONSTRAINT "tb_check_in_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "tb_attendee" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_tb_check_in" ("attendee_id", "created_at", "id") SELECT "attendee_id", "created_at", "id" FROM "tb_check_in";
DROP TABLE "tb_check_in";
ALTER TABLE "new_tb_check_in" RENAME TO "tb_check_in";
CREATE UNIQUE INDEX "tb_check_in_attendee_id_key" ON "tb_check_in"("attendee_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

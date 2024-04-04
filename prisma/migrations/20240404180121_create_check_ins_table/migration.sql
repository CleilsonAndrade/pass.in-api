-- CreateTable
CREATE TABLE "tb_check_in" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendee_id" INTEGER NOT NULL,
    CONSTRAINT "tb_check_in_attendee_id_fkey" FOREIGN KEY ("attendee_id") REFERENCES "tb_attendee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_check_in_attendee_id_key" ON "tb_check_in"("attendee_id");

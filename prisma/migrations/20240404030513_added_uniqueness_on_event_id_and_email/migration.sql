/*
  Warnings:

  - A unique constraint covering the columns `[event_id,email]` on the table `tb_attendee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_attendee_event_id_email_key" ON "tb_attendee"("event_id", "email");

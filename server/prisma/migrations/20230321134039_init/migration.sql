/*
  Warnings:

  - Added the required column `message` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "message" TEXT NOT NULL;

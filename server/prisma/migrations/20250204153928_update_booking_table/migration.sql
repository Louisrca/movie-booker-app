/*
  Warnings:

  - Added the required column `movieName` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "movieName" TEXT NOT NULL;

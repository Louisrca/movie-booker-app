/*
  Warnings:

  - You are about to drop the column `bookinkTime` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `bookingTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookinkTime",
ADD COLUMN     "bookingTime" TIMESTAMP(3) NOT NULL;

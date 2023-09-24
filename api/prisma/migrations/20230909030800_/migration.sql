/*
  Warnings:

  - Changed the type of `booked` on the `motels` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "motels" DROP COLUMN "booked",
ADD COLUMN     "booked" INTEGER NOT NULL;

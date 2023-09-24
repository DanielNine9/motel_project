/*
  Warnings:

  - Added the required column `discount` to the `motels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `motels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "motels" ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

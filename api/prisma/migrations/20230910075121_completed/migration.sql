-- AlterTable
ALTER TABLE "rent" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currentMonth" INTEGER NOT NULL DEFAULT 0;

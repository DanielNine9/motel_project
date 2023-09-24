-- AlterTable
ALTER TABLE "rent" ADD COLUMN     "cancelSideHost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cancelSideRenter" BOOLEAN NOT NULL DEFAULT false;

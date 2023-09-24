-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_hostId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hostId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

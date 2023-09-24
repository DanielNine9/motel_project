-- CreateEnum
CREATE TYPE "typeUser" AS ENUM ('ADMIN', 'RENTER', 'HOST');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,
    "role" "typeUser" NOT NULL,
    "refreshToken" TEXT,
    "banned" BOOLEAN NOT NULL,
    "contact" TEXT NOT NULL,
    "imageURL" TEXT,
    "hostId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rent" (
    "id" SERIAL NOT NULL,
    "idRenter" INTEGER NOT NULL,
    "idMotel" INTEGER NOT NULL,
    "delete" BOOLEAN NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "nation" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "booked" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reviews" INTEGER NOT NULL,
    "desc" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "amenities" TEXT NOT NULL,
    "idUser" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "motels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "motelId" INTEGER NOT NULL,

    CONSTRAINT "rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "idMotel" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rates_motelId_key" ON "rates"("motelId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_idMotel_fkey" FOREIGN KEY ("idMotel") REFERENCES "motels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent" ADD CONSTRAINT "rent_idRenter_fkey" FOREIGN KEY ("idRenter") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "motels" ADD CONSTRAINT "motels_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rates" ADD CONSTRAINT "rates_motelId_fkey" FOREIGN KEY ("motelId") REFERENCES "motels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_idMotel_fkey" FOREIGN KEY ("idMotel") REFERENCES "motels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

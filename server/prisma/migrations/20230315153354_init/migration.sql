-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hasehed" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
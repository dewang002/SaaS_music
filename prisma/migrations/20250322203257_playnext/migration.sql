/*
  Warnings:

  - Added the required column `createAt` to the `Stream` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playedTs` to the `Stream` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stream" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "played" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "playedTs" TIMESTAMP(3) NOT NULL;

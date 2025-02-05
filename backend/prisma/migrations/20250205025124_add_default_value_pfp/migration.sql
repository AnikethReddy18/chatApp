/*
  Warnings:

  - Made the column `pfp_url` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "pfp_url" SET NOT NULL,
ALTER COLUMN "pfp_url" SET DEFAULT 'https://static.wikia.nocookie.net/villainsfanon/images/3/33/Quandale_Side.webp/revision/latest/thumbnail/width/360/height/360?cb=20221120020917';

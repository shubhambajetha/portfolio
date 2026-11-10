/*
  Warnings:

  - Added the required column `endtimedate` to the `CareerExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CareerExperience" ADD COLUMN     "endtimedate" TEXT NOT NULL;

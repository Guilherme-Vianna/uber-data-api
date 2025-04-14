-- AlterTable
ALTER TABLE "profits" ADD COLUMN     "afternoon" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "morning" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "night" BOOLEAN NOT NULL DEFAULT false;

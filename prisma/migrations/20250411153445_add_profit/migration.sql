/*
  Warnings:

  - You are about to drop the column `morning_profit` on the `profits` table. All the data in the column will be lost.
  - You are about to drop the column `night_profit` on the `profits` table. All the data in the column will be lost.
  - Added the required column `hours_worked` to the `profits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `profits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profit` to the `profits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profits" DROP COLUMN "morning_profit",
DROP COLUMN "night_profit",
ADD COLUMN     "hours_worked" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "notes" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "profit" DECIMAL(65,30) NOT NULL;

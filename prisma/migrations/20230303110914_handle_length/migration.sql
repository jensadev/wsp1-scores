/*
  Warnings:

  - A unique constraint covering the columns `[gameId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Score` MODIFY `handle` VARCHAR(12) NULL;

-- CreateIndex
-- CREATE UNIQUE INDEX `Score_gameId_key` ON `Score`(`gameId`);

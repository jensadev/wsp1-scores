/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `type` on table `Type` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Type` MODIFY `type` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Type_type_key` ON `Type`(`type`);

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

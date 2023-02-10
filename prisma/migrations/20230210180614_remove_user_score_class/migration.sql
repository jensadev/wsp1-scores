/*
  Warnings:

  - You are about to drop the `Classcode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameClasses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GameClasses` DROP FOREIGN KEY `GameClasses_classId_fkey`;

-- DropForeignKey
ALTER TABLE `GameClasses` DROP FOREIGN KEY `GameClasses_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `Score` DROP FOREIGN KEY `Score_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `UserClass` DROP FOREIGN KEY `UserClass_classId_fkey`;

-- DropForeignKey
ALTER TABLE `UserClass` DROP FOREIGN KEY `UserClass_userId_fkey`;

-- DropTable
DROP TABLE `Classcode`;

-- DropTable
DROP TABLE `GameClasses`;

-- DropTable
DROP TABLE `Score`;

-- DropTable
DROP TABLE `UserClass`;

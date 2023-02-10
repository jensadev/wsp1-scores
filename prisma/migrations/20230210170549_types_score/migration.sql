/*
  Warnings:

  - Made the column `gameId` on table `GameTypes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeId` on table `GameTypes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `GameUsers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `GameUsers` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `GameTypes` DROP FOREIGN KEY `GameTypes_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `GameTypes` DROP FOREIGN KEY `GameTypes_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `GameUsers` DROP FOREIGN KEY `GameUsers_gameId_fkey`;

-- DropForeignKey
ALTER TABLE `GameUsers` DROP FOREIGN KEY `GameUsers_userId_fkey`;

-- AlterTable
ALTER TABLE `GameTypes` MODIFY `gameId` INTEGER UNSIGNED NOT NULL,
    MODIFY `typeId` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `GameUsers` MODIFY `gameId` INTEGER UNSIGNED NOT NULL,
    MODIFY `userId` INTEGER UNSIGNED NOT NULL;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `score` INTEGER NOT NULL DEFAULT 0,
    `handle` VARCHAR(6) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `gameId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameUsers` ADD CONSTRAINT `GameUsers_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameUsers` ADD CONSTRAINT `GameUsers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameTypes` ADD CONSTRAINT `GameTypes_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameTypes` ADD CONSTRAINT `GameTypes_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

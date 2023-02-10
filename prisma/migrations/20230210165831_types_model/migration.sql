-- CreateTable
CREATE TABLE `GameTypes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER UNSIGNED NULL,
    `typeId` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(200) NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GameTypes` ADD CONSTRAINT `GameTypes_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameTypes` ADD CONSTRAINT `GameTypes_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

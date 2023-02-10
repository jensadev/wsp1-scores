-- CreateTable
CREATE TABLE `Classcode` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(4) NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserClass` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` INTEGER UNSIGNED NOT NULL,
    `classId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GameClasses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER UNSIGNED NOT NULL,
    `classId` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserClass` ADD CONSTRAINT `UserClass_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classcode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameClasses` ADD CONSTRAINT `GameClasses_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GameClasses` ADD CONSTRAINT `GameClasses_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Classcode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

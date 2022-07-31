/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Book` (
    `book_uni_id` VARCHAR(191) NOT NULL,
    `itemId` CHAR(10) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `curVersion` VARCHAR(191) NOT NULL,
    `format` ENUM('reflowable', 'fixedlayout') NOT NULL,
    `status` ENUM('readable', 'forbidden', 'auditing') NOT NULL,

    PRIMARY KEY (`book_uni_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item` CHAR(10) NOT NULL,

    PRIMARY KEY (`item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`item`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The values [auditing] on the enum `Book_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `percnetage` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `info` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Book` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `percnetage` INTEGER NOT NULL,
    ADD COLUMN `progress` VARCHAR(191) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('readable', 'forbidden') NOT NULL;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `info` JSON NOT NULL,
    ADD COLUMN `sub` CHAR(6) NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Category` (
    `sub` CHAR(6) NOT NULL,
    `name` CHAR(64) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`sub`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contributor` (
    `item` CHAR(10) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `illustrator` VARCHAR(191) NOT NULL,
    `editor` VARCHAR(191) NOT NULL,
    `translator` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`item`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sub_fkey` FOREIGN KEY (`sub`) REFERENCES `Category`(`sub`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contributor` ADD CONSTRAINT `Contributor_item_fkey` FOREIGN KEY (`item`) REFERENCES `Item`(`item`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `Book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `book_uni_id` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookUniId,ownerId]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookUniId` to the `Book` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Book` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `_BookToShelf` DROP FOREIGN KEY `_BookToShelf_ibfk_1`;

-- AlterTable
ALTER TABLE `Book` DROP PRIMARY KEY,
    DROP COLUMN `book_uni_id`,
    ADD COLUMN `bookUniId` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Book_bookUniId_ownerId_key` ON `Book`(`bookUniId`, `ownerId`);

-- AddForeignKey
ALTER TABLE `_BookToShelf` ADD FOREIGN KEY (`A`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

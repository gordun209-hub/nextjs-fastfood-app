/*
  Warnings:

  - You are about to drop the `_CategoryToCompany` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCompany" DROP CONSTRAINT "_CategoryToCompany_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCompany" DROP CONSTRAINT "_CategoryToCompany_B_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "companyId" INTEGER;

-- DropTable
DROP TABLE "_CategoryToCompany";

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoryId_key" ON "Product"("categoryId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

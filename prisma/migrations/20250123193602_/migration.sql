/*
  Warnings:

  - The `completed` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('COMPLETED', 'INPROGRESS', 'PENDING');

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "completed" "status" NOT NULL DEFAULT 'PENDING';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'TEACHER';

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT true;

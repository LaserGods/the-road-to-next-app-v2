/*
  Warnings:

  - You are about to drop the column `canDeleteTicket` on the `Membership` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "canDeleteTicket";

-- CreateTable
CREATE TABLE "Role" (
    "name" "MembershipRole" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleName" "MembershipRole" NOT NULL,
    "key" TEXT NOT NULL,
    "value" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleName","key")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "invitedByUserId" TEXT
);

-- CreateIndex
CREATE INDEX "RolePermission_roleName_idx" ON "RolePermission"("roleName");

-- CreateIndex
CREATE INDEX "RolePermission_key_idx" ON "RolePermission"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_tokenHash_key" ON "Invitation"("tokenHash");

-- CreateIndex
CREATE INDEX "Invitation_organizationId_idx" ON "Invitation"("organizationId");

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleName_fkey" FOREIGN KEY ("roleName") REFERENCES "Role"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "campaignRequestId" TEXT NOT NULL,
    "assignedToId" TEXT NOT NULL,
    "assignedById" TEXT NOT NULL,
    "roleLabel" TEXT,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusHistory" (
    "id" TEXT NOT NULL,
    "campaignRequestId" TEXT NOT NULL,
    "oldStatus" "RequestStatus",
    "newStatus" "RequestStatus" NOT NULL,
    "changedById" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Assignment_campaignRequestId_status_idx" ON "Assignment"("campaignRequestId", "status");

-- CreateIndex
CREATE INDEX "Assignment_assignedToId_status_idx" ON "Assignment"("assignedToId", "status");

-- CreateIndex
CREATE INDEX "Assignment_assignedById_idx" ON "Assignment"("assignedById");

-- CreateIndex
CREATE INDEX "StatusHistory_campaignRequestId_createdAt_idx" ON "StatusHistory"("campaignRequestId", "createdAt");

-- CreateIndex
CREATE INDEX "StatusHistory_changedById_idx" ON "StatusHistory"("changedById");

-- CreateIndex
CREATE INDEX "StatusHistory_newStatus_idx" ON "StatusHistory"("newStatus");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_campaignRequestId_fkey" FOREIGN KEY ("campaignRequestId") REFERENCES "CampaignRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_assignedById_fkey" FOREIGN KEY ("assignedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_campaignRequestId_fkey" FOREIGN KEY ("campaignRequestId") REFERENCES "CampaignRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

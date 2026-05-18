-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING_REVIEW', 'ACCEPTED', 'IN_PROGRESS', 'FIRST_LOOK_READY', 'CLIENT_REVIEW', 'REVISION_REQUESTED', 'FINAL_LOOK_READY', 'APPROVED', 'DELIVERED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('SOCIAL_MEDIA_CAMPAIGN', 'DESIGN_POST', 'MOTION_VIDEO', 'LANDING_PAGE', 'WEBSITE', 'PAID_ADS_CAMPAIGN', 'BRAND_IDENTITY', 'PRODUCT_LAUNCH', 'OFFER_CAMPAIGN', 'EVENT_COVERAGE', 'CONTENT_PLAN', 'MONTHLY_PACKAGE');

-- CreateEnum
CREATE TYPE "CampaignGoal" AS ENUM ('SALES', 'BRAND_AWARENESS', 'FOLLOWERS_GROWTH', 'LEADS', 'PRODUCT_LAUNCH', 'OFFER_PROMOTION', 'WEBSITE_TRAFFIC', 'WHATSAPP_MESSAGES');

-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('INSTAGRAM', 'TIKTOK', 'SNAPCHAT', 'X_TWITTER', 'FACEBOOK', 'GOOGLE_ADS', 'WEBSITE', 'WHATSAPP', 'PRINT', 'OUTDOOR_SCREENS');

-- CreateEnum
CREATE TYPE "CreativeStyle" AS ENUM ('FORMAL', 'PREMIUM', 'YOUTHFUL', 'BOLD', 'EMOTIONAL', 'FUNNY', 'DIRECT', 'STORYTELLING', 'SAUDI_LOCAL', 'GULF', 'GLOBAL');

-- CreateEnum
CREATE TYPE "RequestItemType" AS ENUM ('PRODUCT', 'SERVICE');

-- CreateTable
CREATE TABLE "CampaignRequest" (
    "id" TEXT NOT NULL,
    "clientProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "requestTypes" "RequestType"[],
    "goals" "CampaignGoal"[],
    "platforms" "Platform"[],
    "creativeStyles" "CreativeStyle"[],
    "mainMessage" TEXT NOT NULL,
    "offer" TEXT,
    "requiredTexts" TEXT,
    "forbiddenElements" TEXT,
    "competitors" TEXT,
    "references" TEXT,
    "language" TEXT NOT NULL,
    "dialect" TEXT,
    "startDate" TIMESTAMP(3),
    "deadline" TIMESTAMP(3),
    "campaignDuration" TEXT,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "urgentReason" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignRequestItem" (
    "id" TEXT NOT NULL,
    "campaignRequestId" TEXT NOT NULL,
    "itemType" "RequestItemType" NOT NULL,
    "productId" TEXT,
    "serviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignRequestItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CampaignRequest_clientProfileId_createdAt_idx" ON "CampaignRequest"("clientProfileId", "createdAt");

-- CreateIndex
CREATE INDEX "CampaignRequest_status_idx" ON "CampaignRequest"("status");

-- CreateIndex
CREATE INDEX "CampaignRequest_deadline_idx" ON "CampaignRequest"("deadline");

-- CreateIndex
CREATE INDEX "CampaignRequestItem_campaignRequestId_idx" ON "CampaignRequestItem"("campaignRequestId");

-- CreateIndex
CREATE INDEX "CampaignRequestItem_productId_idx" ON "CampaignRequestItem"("productId");

-- CreateIndex
CREATE INDEX "CampaignRequestItem_serviceId_idx" ON "CampaignRequestItem"("serviceId");

-- AddForeignKey
ALTER TABLE "CampaignRequest" ADD CONSTRAINT "CampaignRequest_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "ClientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignRequestItem" ADD CONSTRAINT "CampaignRequestItem_campaignRequestId_fkey" FOREIGN KEY ("campaignRequestId") REFERENCES "CampaignRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignRequestItem" ADD CONSTRAINT "CampaignRequestItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignRequestItem" ADD CONSTRAINT "CampaignRequestItem_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

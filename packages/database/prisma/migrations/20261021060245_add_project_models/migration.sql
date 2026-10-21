-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'PLANNED');

-- CreateTable
CREATE TABLE "project_listings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "category" TEXT,
    "technologies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "ProjectStatus" NOT NULL DEFAULT 'COMPLETED',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_details" (
    "id" TEXT NOT NULL,
    "projectListingId" TEXT NOT NULL,
    "overview" TEXT,
    "problemStatement" TEXT,
    "solution" TEXT,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "challenges" TEXT,
    "architecture" TEXT,
    "role" TEXT,
    "duration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_listings_slug_key" ON "project_listings"("slug");

-- CreateIndex
CREATE INDEX "project_listings_published_sortOrder_idx" ON "project_listings"("published", "sortOrder");

-- CreateIndex
CREATE INDEX "project_listings_featured_idx" ON "project_listings"("featured");

-- CreateIndex
CREATE INDEX "project_listings_category_idx" ON "project_listings"("category");

-- CreateIndex
CREATE UNIQUE INDEX "project_details_projectListingId_key" ON "project_details"("projectListingId");

-- AddForeignKey
ALTER TABLE "project_details" ADD CONSTRAINT "project_details_projectListingId_fkey" FOREIGN KEY ("projectListingId") REFERENCES "project_listings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

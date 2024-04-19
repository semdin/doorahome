-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "siteLink" TEXT NOT NULL DEFAULT 'default_siteLink_value',
    "cardName" TEXT NOT NULL DEFAULT 'default_cardName_value',
    "card1Title" TEXT NOT NULL DEFAULT 'default_card1Title_value',
    "card1Description" VARCHAR(1000) NOT NULL DEFAULT 'default_card1Description_value',
    "card2Title" TEXT NOT NULL DEFAULT 'default_card2Title_value',
    "card2Description" VARCHAR(1000) NOT NULL DEFAULT 'default_card2Description_value',
    "card3Title" TEXT NOT NULL DEFAULT 'default_card3Title_value',
    "card3Description" VARCHAR(1000) NOT NULL DEFAULT 'default_card3Description_value',
    "fLogoUrl" TEXT NOT NULL DEFAULT 'default_fLogoUrl_value',
    "fRes1Title" TEXT NOT NULL DEFAULT 'default_fRes1Title_value',
    "fRes1Link" TEXT NOT NULL DEFAULT 'default_fRes1Link_value',
    "fRes2Title" TEXT NOT NULL DEFAULT 'default_fRes2Title_value',
    "fRes2Link" TEXT NOT NULL DEFAULT 'default_fRes2Link_value',
    "facebookUrl" TEXT NOT NULL DEFAULT 'default_facebookUrl_value',
    "instagramUrl" TEXT NOT NULL DEFAULT 'default_instagramUrl_value',
    "twitterUrl" TEXT NOT NULL DEFAULT 'default_twitterUrl_value',
    "privacyPolicy" TEXT NOT NULL DEFAULT 'default_privacyPolicy_value',
    "termsAndConditions" TEXT NOT NULL DEFAULT 'default_termsAndConditions_value',
    "contactUsDescription" VARCHAR(1000) NOT NULL DEFAULT 'default_contactUsDescription_value',
    "contactUsCard1Descrition" VARCHAR(1000) NOT NULL DEFAULT 'default_contactUsCard1Descrition_value',
    "contactUsCard1Email" TEXT NOT NULL DEFAULT 'default_contactUsCard1Email_value',
    "contactUsCard2Descrition" VARCHAR(1000) NOT NULL DEFAULT 'default_contactUsCard2Descrition_value',
    "contactUsCard2Phone" TEXT NOT NULL DEFAULT 'default_contactUsCard2Phone_value',
    "aboutUsDescription" VARCHAR(1000) NOT NULL DEFAULT 'default_aboutUsDescription_value',
    "aboutUsPhotoUrl" TEXT NOT NULL DEFAULT 'default_aboutUsPhotoUrl_value',
    "aboutUsOurStory" VARCHAR(1000) NOT NULL DEFAULT 'default_aboutUsOurStory_value',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billboard" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "billboardId" TEXT NOT NULL,
    "parentCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" VARCHAR(1000) NOT NULL DEFAULT 'default_description_value',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "sizeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Billboard_storeId_idx" ON "Billboard"("storeId");

-- CreateIndex
CREATE INDEX "Category_storeId_idx" ON "Category"("storeId");

-- CreateIndex
CREATE INDEX "Category_billboardId_idx" ON "Category"("billboardId");

-- CreateIndex
CREATE INDEX "Category_parentCategoryId_idx" ON "Category"("parentCategoryId");

-- CreateIndex
CREATE INDEX "Size_storeId_idx" ON "Size"("storeId");

-- CreateIndex
CREATE INDEX "Color_storeId_idx" ON "Color"("storeId");

-- CreateIndex
CREATE INDEX "Contact_storeId_idx" ON "Contact"("storeId");

-- CreateIndex
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_sizeId_idx" ON "Product"("sizeId");

-- CreateIndex
CREATE INDEX "Product_colorId_idx" ON "Product"("colorId");

-- CreateIndex
CREATE INDEX "Image_productId_idx" ON "Image"("productId");

-- CreateIndex
CREATE INDEX "Order_storeId_idx" ON "Order"("storeId");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

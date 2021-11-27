-- CreateTable
CREATE TABLE "Article" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT
);

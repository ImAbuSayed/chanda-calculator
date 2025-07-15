-- CreateTable
CREATE TABLE "Calculation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "income" REAL NOT NULL,
    "chandaAmount" REAL NOT NULL,
    "receiptId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Calculation_receiptId_key" ON "Calculation"("receiptId");

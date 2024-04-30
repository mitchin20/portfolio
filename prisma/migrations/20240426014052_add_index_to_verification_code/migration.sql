-- CreateIndex
CREATE INDEX "VerificationCode_userId_expiresAt_idx" ON "VerificationCode"("userId", "expiresAt");

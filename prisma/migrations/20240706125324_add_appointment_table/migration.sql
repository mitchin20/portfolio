-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "technicianId" INTEGER NOT NULL,
    "technicianName" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "selectedDate" TEXT NOT NULL,
    "selectedTime" TEXT NOT NULL,
    "services" TEXT[],
    "note" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

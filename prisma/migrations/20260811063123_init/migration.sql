/*
  Warnings:

  - You are about to drop the `siswa_pplg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "siswa_pplg";

-- CreateTable
CREATE TABLE "pm_siswa" (
    "no_urut" SERIAL NOT NULL,
    "nama_siswa" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,

    CONSTRAINT "pm_siswa_pkey" PRIMARY KEY ("no_urut")
);

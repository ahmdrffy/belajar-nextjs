-- AlterTable
ALTER TABLE "pm_siswa" ADD COLUMN     "id_kelas" INTEGER;

-- CreateTable
CREATE TABLE "pm_kelas" (
    "id_kelas" SERIAL NOT NULL,
    "nama_kelas" TEXT NOT NULL,

    CONSTRAINT "pm_kelas_pkey" PRIMARY KEY ("id_kelas")
);

-- CreateIndex
CREATE UNIQUE INDEX "pm_kelas_nama_kelas_key" ON "pm_kelas"("nama_kelas");

-- AddForeignKey
ALTER TABLE "pm_siswa" ADD CONSTRAINT "pm_siswa_id_kelas_fkey" FOREIGN KEY ("id_kelas") REFERENCES "pm_kelas"("id_kelas") ON DELETE SET NULL ON UPDATE CASCADE;

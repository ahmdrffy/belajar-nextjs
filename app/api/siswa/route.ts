import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 1. FUNGSI GET: Mengambil Data (Bisa ditest langsung di Browser)
export async function GET() {
  // Tarik semua data siswa dari tabel PostgreSQL
  const dataSiswa = await prisma.pm_siswa.findMany();

  // Kembalikan sebagai respon berformat JSON
  return NextResponse.json(dataSiswa);
}

// 2. FUNGSI POST: Menambah Data (Menerima JSON dari luar)
export async function POST(request: NextRequest) {
  // Tangkap data JSON yang dikirimkan
  const body = await request.json();

  // Simpan data tersebut ke database
  const siswaBaru = await prisma.pm_siswa.create({
    data: {
      nama_siswa: body.nama_siswa,
      jenis_kelamin: body.jenis_kelamin,
    }
  });

  // Kembalikan respon sukses dan cetak data yang baru masuk
  return NextResponse.json(siswaBaru, { status: 201 });
}
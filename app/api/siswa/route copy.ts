import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET() {
  const dataSiswa = await prisma.pm_siswa.findMany();
  
  return NextResponse.json(dataSiswa);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const siswaBaru = await prisma.pm_siswa.create({
    data: {
      nama_siswa: body.nama_siswa,
      jenis_kelamin: body.jenis_kelamin,
    }
  });

  return NextResponse.json(siswaBaru, { status: 201 });
}
'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahSiswa(data) {
  const nama_siswa = data.nama_siswa;
  const jenis_kelamin = data.jenis_kelamin;
  const id_kelas = Number(data.id_kelas);

  await prisma.pm_siswa.create({
    data: {
      nama_siswa,   
      jenis_kelamin,
      kelas: id_kelas ? { connect: { id_kelas } } : undefined,
    },
  });

  revalidatePath("/admin");
}

export async function editSiswa(formData) {
  const no_urut = Number(formData.get("no_urut"));
  const nama_siswa = formData.get("nama_siswa")?.trim();
  const jenis_kelamin = formData.get("jenis_kelamin");
  const id_kelas = Number(formData.get("id_kelas"));
  const telepon = formData.get("telepon")?.trim() || null;
  const alamat = formData.get("alamat")?.trim() || null;
  const fotoFile = formData.get("foto");

  const existing = await prisma.pm_siswa.findUnique({ where: { no_urut } });
  let fotoUrl = existing?.foto || null;

  if (fotoFile && typeof fotoFile === "object" && fotoFile.size > 0) {
    const bytes = await fotoFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = fotoFile.type || "image/jpeg";
    fotoUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;
  }

  await prisma.pm_siswa.update({
    where: {
      no_urut,
    },
    data: {
      nama_siswa,
      jenis_kelamin,
      kelas: id_kelas ? { connect: { id_kelas } } : undefined,
      telepon,
      alamat,
      foto: fotoUrl,
    },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/edit/${no_urut}`);
  revalidatePath("/profil");
  redirect("/admin");
}

export async function hapusSiswa(no_urut) {
  await prisma.pm_siswa.delete({
    where: {  
      no_urut,
    },
  });

  revalidatePath("/admin");
}

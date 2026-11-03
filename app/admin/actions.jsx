'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/app/auth/actions";

// Guard role pada aksi edit
export async function editSiswa(formData) {
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") {
    throw new Error("Tidak diizinkan: Hanya admin yang dapat mengubah data siswa.");
  }

  const no_urut = Number(formData.get("no_urut"));
  const nama_siswa = formData.get("nama_siswa")?.trim();
  const jenis_kelamin = formData.get("jenis_kelamin");
  const id_kelas = Number(formData.get("id_kelas"));

  await prisma.pm_siswa.update({
    where: { no_urut },
    data: {
      nama_siswa,
      jenis_kelamin,
      kelas: id_kelas ? { connect: { id_kelas } } : undefined,
    },
  });

  revalidatePath("/admin");
  revalidatePath(`/admin/edit/${no_urut}`);
  redirect("/admin");
}

// Guard role pada aksi hapus
export async function hapusSiswa(no_urut) {
  const user = await getLoggedInUser();
  if (!user || user.role !== 'admin') throw new Error('Tidak diizinkan');
  await prisma.pm_siswa.delete({ where: { no_urut } });
  revalidatePath('/admin');
}

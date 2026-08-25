'use server';// Untuk mengeksekusi dari server bukan browser

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // Import fungsi revalidatePath.
import { redirect } from "next/navigation";

export async function tambahSiswa(formData) {
  const nama_siswa = formData.get("nama_siswa");
  const jenis_kelamin = formData.get("jenis_kelamin");

  await prisma.pm_siswa.create({
    data: {
      nama_siswa,   
      jenis_kelamin,
    },
  });

  revalidatePath("/admin"); // Untuk merefresh secara otomatis jika ada data baru.

}

export async function editSiswa(formData) {
  const no_urut = Number(formData.get("no_urut")); // Ambil ID dari hidden input
  const nama_siswa = formData.get("nama_siswa");
  const jenis_kelamin = formData.get("jenis_kelamin");

  await prisma.pm_siswa.update({
    where: {
      no_urut,
    },
    data: {
      nama_siswa,
      jenis_kelamin,
    },
  });

  revalidatePath("/admin");
  redirect("/admin"); // Pindah halaman setelah edit sukses
}


export async function hapusSiswa(formData) {
  const no_urut = Number(formData.get("no_urut"))

  await prisma.pm_siswa.delete({
    where: {  
      no_urut,
    },
  });

  revalidatePath("/admin");
}
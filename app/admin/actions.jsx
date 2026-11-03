<<<<<<< HEAD
'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahSiswa(data) {
  const nama_siswa = data.nama_siswa;
  const jenis_kelamin = data.jenis_kelamin;
  const id_kelas = Number(data.id_kelas);
=======
'use server';// Untuk mengeksekusi dari server bukan browser

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // Import fungsi revalidatePath.
import { redirect } from "next/navigation";

export async function tambahSiswa(formData) {
  const nama_siswa = formData.get("nama_siswa");
  const jenis_kelamin = formData.get("jenis_kelamin");
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

  await prisma.pm_siswa.create({
    data: {
      nama_siswa,   
      jenis_kelamin,
<<<<<<< HEAD
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
=======
    },
  });

  revalidatePath("/admin"); // Untuk merefresh secara otomatis jika ada data baru.

}

export async function editSiswa(formData) {
  const no_urut = Number(formData.get("no_urut")); // Ambil ID dari hidden input
  const nama_siswa = formData.get("nama_siswa");
  const jenis_kelamin = formData.get("jenis_kelamin");
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

  await prisma.pm_siswa.update({
    where: {
      no_urut,
    },
    data: {
      nama_siswa,
      jenis_kelamin,
<<<<<<< HEAD
      kelas: id_kelas ? { connect: { id_kelas } } : undefined,
      telepon,
      alamat,
      foto: fotoUrl,
=======
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436
    },
  });

  revalidatePath("/admin");
<<<<<<< HEAD
  revalidatePath(`/admin/edit/${no_urut}`);
  revalidatePath("/profil");
  redirect("/admin");
}

export async function hapusSiswa(no_urut) {
=======
  redirect("/admin"); // Pindah halaman setelah edit sukses
}


export async function hapusSiswa(formData) {
  const no_urut = Number(formData.get("no_urut"))

>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436
  await prisma.pm_siswa.delete({
    where: {  
      no_urut,
    },
  });

  revalidatePath("/admin");
<<<<<<< HEAD
}
=======
}
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

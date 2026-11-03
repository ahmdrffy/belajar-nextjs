import { getLoggedInUser } from "@/app/auth/actions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import FormProfilSiswa from "@/components/FormProfilSiswa";
import Link from "next/link";

export default async function EditProfilPage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "admin") {
    redirect("/admin");
  }

  const daftarKelas = await prisma.pm_kelas.findMany({
    orderBy: { nama_kelas: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/profil"
          className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          &larr; Kembali ke Profil
        </Link>
      </div>

      <FormProfilSiswa siswa={user.siswa} daftarKelas={daftarKelas} />
    </div>
  );
}


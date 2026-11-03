import { prisma } from "@/lib/prisma"; // Akses database langsung (Aman di Server)
import Link from "next/link";
import TombolHapus from "@/components/TombolHapus";
import { getLoggedInUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  // Verifikasi otorisasi di server
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  // 1. Ambil data siswa langsung di Server
  const daftarSiswa = await prisma.pm_siswa.findMany({
    include: { kelas: true },
    orderBy: { no_urut: "asc" },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto my-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">
          Panel Data Siswa (Khusus Admin)
        </h1>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
          Login: {user.email}
        </span>
      </div>

      {/* Tabel Data Siswa */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 text-gray-700 font-semibold">
              <th className="py-3 px-4">No Urut</th>
              <th className="py-3 px-4">Nama</th>
              <th className="py-3 px-4">Jenis Kelamin</th>
              <th className="py-3 px-4">Kelas</th>
              <th className="py-3 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {daftarSiswa.map((s) => ( 
              <tr key={s.no_urut} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">{s.no_urut}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{s.nama_siswa}</td>
                <td className="py-3 px-4">{s.jenis_kelamin}</td>
                <td className="py-3 px-4">{s.kelas?.nama_kelas ?? "-"}</td>
                <td className="py-3 px-4">
                  <Link href={`/admin/edit/${s.no_urut}`}>
                    <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors cursor-pointer">
                      Edit
                    </button>
                  </Link>
                  {" | "}
                  <TombolHapus no_urut={s.no_urut} />
                </td>
              </tr>
            ))}
            {daftarSiswa.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  Belum ada data siswa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

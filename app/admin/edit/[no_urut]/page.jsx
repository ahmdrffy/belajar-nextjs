import { prisma } from "@/lib/prisma";
import { editSiswa } from "../../actions";
import { getLoggedInUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditSiswaPage({ params }) {
  // Guard role admin
  const user = await getLoggedInUser();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/");

  const { no_urut } = await params;
  const id = Number(no_urut);

  // 1. Ambil data siswa yang ingin diedit
  const siswa = await prisma.pm_siswa.findUnique({
    where: { no_urut: id },
    include: { kelas: true },
  });

  const daftarKelas = await prisma.pm_kelas.findMany({
    orderBy: { id_kelas: "asc" },
  });

  if (!siswa) {
    return (
      <div className="max-w-xl mx-auto my-12 px-4">
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Data Siswa Tidak Ditemukan
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Siswa dengan nomor urut #{no_urut} tidak ditemukan di database.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Kembali ke Panel Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-8 px-4 sm:px-0">
      <div className="mb-4">
        <Link
          href="/admin"
          className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
        >
          &larr; Kembali ke Panel Admin
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Data Siswa
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Perbarui nama siswa, jenis kelamin, dan penempatan kelas.
          </p>
        </div>

        <form action={editSiswa} className="space-y-4">
          <input type="hidden" name="no_urut" value={siswa.no_urut} />

          {/* Nomor Urut */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Nomor Urut / ID
            </label>
            <input
              type="text"
              value={`#${siswa.no_urut}`}
              disabled
              className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-500 cursor-not-allowed select-none"
            />
          </div>

          {/* Nama Siswa */}
          <div className="space-y-1">
            <label
              htmlFor="nama_siswa"
              className="block text-sm font-semibold text-gray-800"
            >
              Nama Siswa <span className="text-red-500">*</span>
            </label>
            <input
              id="nama_siswa"
              type="text"
              name="nama_siswa"
              defaultValue={siswa.nama_siswa}
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          {/* Jenis Kelamin */}
          <div className="space-y-1">
            <label
              htmlFor="jenis_kelamin"
              className="block text-sm font-semibold text-gray-800"
            >
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              defaultValue={siswa.jenis_kelamin}
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white cursor-pointer"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          {/* Kelas */}
          <div className="space-y-1">
            <label
              htmlFor="id_kelas"
              className="block text-sm font-semibold text-gray-800"
            >
              Kelas <span className="text-red-500">*</span>
            </label>
            <select
              id="id_kelas"
              name="id_kelas"
              defaultValue={siswa.id_kelas ?? ""}
              required
              className="w-full px-3.5 py-2 border border-gray-300 rounded-md text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white cursor-pointer"
            >
              <option value="" disabled>Pilih Kelas</option>
              {daftarKelas.map((k) => (
                <option key={k.id_kelas} value={k.id_kelas}>
                  {k.nama_kelas}
                </option>
              ))}
            </select>
          </div>

          {/* Tombol Aksi */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md transition-colors cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

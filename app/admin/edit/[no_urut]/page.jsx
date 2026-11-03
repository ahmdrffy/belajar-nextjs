import { prisma } from "@/lib/prisma";
<<<<<<< HEAD
import { editSiswa } from "../../actions";
import Link from "next/link";
=======
import { editSiswa } from "@/app/admin/actions";
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

export default async function EditSiswaPage({ params }) {
  const { no_urut } = await params;
  const id = Number(no_urut);

<<<<<<< HEAD
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
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Data Siswa Tidak Ditemukan
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Siswa dengan nomor urut{" "}
            <span className="font-semibold text-gray-700">#{no_urut}</span> tidak
            ditemukan di database.
          </p>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Panel Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-8 px-4 sm:px-0">
      {/* Tombol Navigasi Kembali */}
      <div className="mb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke Daftar Siswa
        </Link>
      </div>

      {/* Card Utama Formulir */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden">
        {/* Header Card */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50/70 to-white px-6 py-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/70 mb-2">
                No. Urut #{siswa.no_urut}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Edit Data Siswa
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Perbarui informasi lengkap, foto, kontak, dan kelas siswa di bawah ini.
              </p>
            </div>

            {/* Chip Indikator Kelas Saat Ini */}
            <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100/90 rounded-lg text-xs font-medium text-gray-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{siswa.kelas?.nama_kelas ?? "Belum Ada Kelas"}</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form action={editSiswa} className="p-6 sm:p-8 space-y-6">
          {/* Hidden input untuk ID */}
          <input type="hidden" name="no_urut" value={siswa.no_urut} />

          {/* Upload Foto Profil */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
              {siswa.foto ? (
                <img
                  src={siswa.foto}
                  alt={siswa.nama_siswa}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <label
                htmlFor="foto"
                className="text-sm font-semibold text-gray-800 block mb-1"
              >
                Ganti Foto Profil Siswa
              </label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                className="text-xs sm:text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Format: JPG, PNG, WEBP (biarkan kosong jika tidak ingin mengganti foto).
              </p>
            </div>
          </div>

          {/* Field: Nomor Urut (Read-only) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
              Nomor Urut (ID)
            </label>
            <input
              type="text"
              value={`#${siswa.no_urut}`}
              disabled
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed select-none font-mono"
            />
          </div>

          {/* Field: Nama Siswa */}
          <div className="space-y-1.5">
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
              placeholder="Contoh: Budi Santoso"
              required
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>

          {/* Grid 2 Kolom: Jenis Kelamin & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Field: Jenis Kelamin */}
            <div className="space-y-1.5">
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
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 cursor-pointer"
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Field: Kelas */}
            <div className="space-y-1.5">
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
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 cursor-pointer"
              >
                <option value="" disabled>Pilih Kelas</option>
                {daftarKelas.map((k) => (
                  <option key={k.id_kelas} value={k.id_kelas}>
                    {k.nama_kelas}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Field: Nomor Telepon / WA */}
          <div className="space-y-1.5">
            <label
              htmlFor="telepon"
              className="block text-sm font-semibold text-gray-800"
            >
              Nomor Telepon / WhatsApp
            </label>
            <input
              id="telepon"
              type="tel"
              name="telepon"
              defaultValue={siswa.telepon || ""}
              placeholder="Contoh: 081234567890"
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>

          {/* Field: Alamat Lengkap */}
          <div className="space-y-1.5">
            <label
              htmlFor="alamat"
              className="block text-sm font-semibold text-gray-800"
            >
              Alamat Lengkap
            </label>
            <textarea
              id="alamat"
              name="alamat"
              rows={3}
              defaultValue={siswa.alamat || ""}
              placeholder="Contoh: Jl. Merdeka No. 21, RT 01/RW 02, Jakarta Pusat"
              className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <Link
              href="/admin"
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium text-sm rounded-lg transition-colors text-center shadow-xs"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-lg transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
=======
  const siswa = await prisma.pm_siswa.findUnique({
    where: { no_urut: id },
  });

  return (
    <div>
      <h2>Edit Siswa #{siswa.no_urut}</h2>
      <form action={editSiswa}>
        <input type="hidden" name="no_urut" value={siswa.no_urut} />
        <div>
          <label>Nama Siswa: </label>
          <input
            type="text"
            name="nama_siswa"
            defaultValue={siswa.nama_siswa}
            required
          />
        </div>

        <div>
          <label>Jenis Kelamin: </label>
          <select
            name="jenis_kelamin"
            defaultValue={siswa.jenis_kelamin}
            required
          >
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}

>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

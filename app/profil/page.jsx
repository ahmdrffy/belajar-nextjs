import { getLoggedInUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilPage() {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/login");
  }

  // Admin tidak perlu mengedit profil siswa, langsung ke dashboard admin
  if (user.role === "admin") {
    redirect("/admin");
  }

  const siswa = user.siswa;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Halaman & Tombol Menuju Halaman Edit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profil Siswa</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Informasi akun dan data diri Anda di SMK 21
          </p>
        </div>
        <Link
          href="/profil/edit"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors shadow-sm"
        >
          ✏️ Edit Profil
        </Link>
      </div>

      {/* Peringatan jika belum melengkapi biodata */}
      {!siswa && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-amber-900 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-base">⚠️ Biodata Belum Lengkap!</p>
            <p className="mt-1 text-amber-800">
              Anda baru mendaftarkan akun. Silakan lengkapi nama, kelas, alamat, dan foto profil Anda.
            </p>
          </div>
          <Link
            href="/profil/edit"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-md text-xs sm:text-sm text-center whitespace-nowrap"
          >
            Lengkapi Sekarang
          </Link>
        </div>
      )}

      {/* Kartu Biodata Pelajar (Tampilan Profil) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Banner Atas Kartu */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex flex-col sm:flex-row items-center gap-5">
          {/* Foto Siswa */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white shadow-md flex items-center justify-center text-white shrink-0">
            {siswa?.foto ? (
              <img
                src={siswa.foto}
                alt={siswa.nama_siswa}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-14 h-14 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold">
              {siswa?.nama_siswa || "Belum Mengisi Nama"}
            </h2>
            <p className="text-blue-100 text-sm mt-0.5">
              Kelas: <span className="font-semibold text-white">{siswa?.kelas?.nama_kelas || "-"}</span>
            </p>
            <span className="inline-block mt-2 px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-medium">
              ID Siswa: #{siswa?.no_urut || "Belum ada"}
            </span>
          </div>
        </div>

        {/* Rincian Informasi Pribadi */}
        <div className="p-6 divide-y divide-gray-100 text-sm">
          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium">Email Akun</span>
            <span className="sm:col-span-2 text-gray-800 font-semibold">{user.email}</span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium">Jenis Kelamin</span>
            <span className="sm:col-span-2 text-gray-800">
              {siswa?.jenis_kelamin || "-"}
            </span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium">Nomor WhatsApp / Telp</span>
            <span className="sm:col-span-2 text-gray-800">
              {siswa?.telepon || "-"}
            </span>
          </div>

          <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
            <span className="text-gray-500 font-medium">Alamat</span>
            <span className="sm:col-span-2 text-gray-800">
              {siswa?.alamat || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

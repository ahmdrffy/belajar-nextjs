"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { simpanProfilSiswa } from "@/app/auth/actions";

export default function FormProfilSiswa({ siswa, daftarKelas }) {
  const [state, formAction, isPending] = useActionState(simpanProfilSiswa, null);
  const [preview, setPreview] = useState(siswa?.foto || null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {siswa ? "Edit Biodata Siswa" : "Lengkapi Biodata Siswa"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Isi informasi profil lengkap Anda di bawah ini.
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        {/* Foto Profil Upload & Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-2 border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
            {preview ? (
              <img
                src={preview}
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <label
              htmlFor="foto"
              className="text-sm font-semibold text-gray-700 block mb-1"
            >
              Foto Profil
            </label>
            <input
              type="file"
              id="foto"
              name="foto"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1">
              Pilih file gambar untuk mengganti foto profil. Format: JPG, PNG, WEBP.
            </p>
          </div>
        </div>

        {/* Nama Lengkap */}
        <div className="flex flex-col">
          <label htmlFor="nama_siswa" className="text-sm font-semibold mb-1 text-gray-700">
            Nama Lengkap Siswa <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nama_siswa"
            name="nama_siswa"
            required
            defaultValue={siswa?.nama_siswa || ""}
            placeholder="Contoh: Budi Santoso"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Jenis Kelamin & Kelas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="jenis_kelamin" className="text-sm font-semibold mb-1 text-gray-700">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <select
              id="jenis_kelamin"
              name="jenis_kelamin"
              required
              defaultValue={siswa?.jenis_kelamin || ""}
              className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="id_kelas" className="text-sm font-semibold mb-1 text-gray-700">
              Kelas <span className="text-red-500">*</span>
            </label>
            <select
              id="id_kelas"
              name="id_kelas"
              required
              defaultValue={siswa?.id_kelas || ""}
              className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
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

        {/* Nomor Telepon / WA */}
        <div className="flex flex-col">
          <label htmlFor="telepon" className="text-sm font-semibold mb-1 text-gray-700">
            Nomor Telepon / WhatsApp
          </label>
          <input
            type="tel"
            id="telepon"
            name="telepon"
            defaultValue={siswa?.telepon || ""}
            placeholder="Contoh: 081234567890"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Alamat Tempat Tinggal */}
        <div className="flex flex-col">
          <label htmlFor="alamat" className="text-sm font-semibold mb-1 text-gray-700">
            Alamat Lengkap
          </label>
          <textarea
            id="alamat"
            name="alamat"
            rows={3}
            defaultValue={siswa?.alamat || ""}
            placeholder="Contoh: Jl. Merdeka No. 21, RT 01/RW 02, Jakarta Pusat"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Tombol Simpan & Batal */}
        <div className="flex items-center gap-3 pt-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
          >
            {isPending ? "Menyimpan Data..." : "Simpan Profil"}
          </button>
          <Link
            href="/profil"
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm font-medium transition-colors"
          >
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}

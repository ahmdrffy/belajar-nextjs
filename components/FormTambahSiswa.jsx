"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tambahSiswa } from "@/app/admin/actions";

export default function FormTambahSiswa() {
  const router = useRouter();

  // 1. MEMORI FORMULIR (State untuk menyimpan ketikan)
  const [formData, setFormData] = useState({
    nama_siswa: "",
    jenis_kelamin: "",
    id_kelas: "",
  });

  // 2. MEMORI LOADING (State untuk memblokir tombol saat proses kirim)
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Nyalakan status loading
    try {
      // Kirim data ke Server
      await tambahSiswa(formData);
      // Jika berhasil, munculkan notifikasi pop-up
      alert("Data siswa berhasil disimpan!");
      // Kosongkan kembali form isiannya
      setFormData({ nama_siswa: "", jenis_kelamin: "", id_kelas: "" });
      // Perintah untuk me-refresh data tabel tanpa reload halaman
      router.refresh();
    } catch (error) {
      // Jaring pengaman: Jika terjadi masalah di database
      alert("Terjadi Kesalahan. Gagal menyimpan data: ");
      console.error(error);
    } finally {
      // Apapun yang terjadi (sukses/gagal), matikan status loading
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm space-y-4"
    >
      <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">
        Form Tambah Siswa Baru
      </h3>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label className="text-sm font-medium text-gray-700 w-32">
          Nama Siswa:{" "}
        </label>
        <input
          type="text"
          value={formData.nama_siswa}
          onChange={(e) =>
            setFormData({ ...formData, nama_siswa: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label className="text-sm font-medium text-gray-700 w-32">
          Jenis Kelamin:{" "}
        </label>
        <select
          value={formData.jenis_kelamin}
          onChange={(e) =>
            setFormData({ ...formData, jenis_kelamin: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          required
        >
          <option value="" disabled>
            Pilih Jenis Kelamin
          </option>
          <option value="Laki-Laki">Laki-Laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>
      </div>

<div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <label className="text-sm font-medium text-gray-700 w-32">
          Kelas:{" "}
        </label>
        <select
          value={formData.id_kelas}
          onChange={(e) =>
            setFormData({ ...formData, id_kelas: e.target.value })
          }
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          required
        >
          <option value="" disabled>
            Pilih Kelas
          </option>
          <option value="1">X PPLG</option>
          <option value="2">XI PPLG</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-medium text-sm rounded-md transition-colors shadow-sm cursor-pointer"
      >
        {isLoading ? "Menyimpan..." : "Simpan Data"}
      </button>
    </form>
  );
}

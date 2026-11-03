<<<<<<< HEAD
import { prisma } from "@/lib/prisma"; // Akses database langsung (Aman di Server)
import Link from "next/link";
import FormTambahSiswa from "@/components/FormTambahSiswa";
import TombolHapus from "@/components/TombolHapus";
import { getLoggedInUser } from "@/app/auth/actions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  // Verifikasi hanya role admin yang boleh membuka halaman ini
  const user = await getLoggedInUser();
  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  // 1. Ambil data siswa langsung di Server
  const daftarSiswa = await prisma.pm_siswa.findMany({
    include: { kelas: true },
    orderBy: { no_urut: "asc" },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto my-6 px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Panel Data Siswa
      </h1>

      {/* 2. Pasang Form Tambah (Client Component) */}

      {/* 3. Tampilkan Tabel Data */}
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
                  {/* Link pindah halaman Edit */}
                  <Link href={`/admin/edit/${s.no_urut}`}>
                    <button className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-colors cursor-pointer">
                      Edit
                    </button>
                  </Link>
                  {" | "}
                  {/* Pasang Tombol Hapus & oper props no_urut */}
                  <TombolHapus no_urut={s.no_urut} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
=======
import { tambahSiswa, hapusSiswa } from "@/app/admin/actions";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {

  const daftarSiswa = await prisma.pm_siswa.findMany({
    orderBy : {no_urut: 'asc'}
  });

  return (
    <div>    
      {/*Read Data dari DB*/}
      <div>
      <h1>Halaman Admin</h1>
      <h2>Daftar Siswa</h2>
      <ul>
        {daftarSiswa.map((siswa) => (
          <li key={siswa.no_urut}>
            {siswa.no_urut} - {siswa.nama_siswa} ({siswa.jenis_kelamin})
            <Link href={`/admin/edit/${siswa.no_urut}`}>
              <button type="button" style={{marginLeft: "15px"}}>Edit</button>
            </Link>
            <form action={hapusSiswa} style={{display: "inline", marginLeft: "15px"}}>
              <input type="hidden" name="no_urut" value={siswa.no_urut} />
              <button type="submit">Hapus</button>
            </form>
          </li>
        ))}
      </ul>
      </div>

      <hr/>
        
      {/*Add Data ke DB*/}
      <div>
        <h2>Tambah Data Siswa</h2>
        <form action={tambahSiswa}>
          <div>
            <label>Nama Siswa : </label>
            <input type="text" name="nama_siswa" required/>
          </div>
          <div>
            <label>Jenis Kelamin : </label>
              <select name="jenis_kelamin" required defaultValue="">
                <option disabled value="">Pilih Jenis Kelamin</option>
                <option value="Laki-Laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            <button type="submit">Tambah</button>
          </div>
        </form>
      </div>
    </div>

  );
}
>>>>>>> 2a20375c799ec38d5f0d369144a518a50394a436

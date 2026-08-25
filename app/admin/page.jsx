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

import { prisma } from "@/lib/prisma";
import { editSiswa } from "@/app/admin/actions";

export default async function EditSiswaPage({ params }) {
  const { no_urut } = await params;
  const id = Number(no_urut);

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


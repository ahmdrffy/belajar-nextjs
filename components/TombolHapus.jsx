'use client'; 
import { useRouter } from 'next/navigation';
import { hapusSiswa } from '@/app/admin/actions'; // Fungsi Server

export default function TombolHapus({ no_urut }) {
  const router = useRouter();

  const eksekusiHapus = async () => {
    // 1. Kotak dialog konfirmasi bawaan browser
    const konfirmasi = window.confirm('Yakin ingin menghapus data ini?');
    
    // 2. Jika tombol "OK" diklik
    if (konfirmasi) {
      try {
        await hapusSiswa(no_urut); // Panggil fungsi Server
        alert('Data berhasil dihapus!');
        router.refresh(); // Update tampilan tabel seketika
      } catch (error) {
        alert('Gagal menghapus data.');
      }
    }
  };

  return (
    <button
      onClick={eksekusiHapus}
      className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition-colors cursor-pointer"
    >
      Hapus
    </button>
  );
}
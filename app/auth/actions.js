'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// 1. Ambil data user yang sedang login dari cookie
export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get('session_user_id')?.value;

  if (!sessionUserId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(sessionUserId) },
      include: {
        siswa: {
          include: { kelas: true },
        },
      },
    });
    return user;
  } catch (error) {
    console.error('Error getLoggedInUser:', error);
    return null;
  }
}

// 2. Registrasi Akun Siswa
export async function registerUser(prevState, formData) {
  const email = formData.get('email')?.trim();
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi!' };
  }

  if (password.length < 6) {
    return { error: 'Password minimal 6 karakter!' };
  }

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi password tidak cocok!' };
  }

  // Cek apakah email sudah terdaftar
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email sudah terdaftar, silakan login.' };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user baru (role default: siswa)
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: 'siswa',
    },
  });

  // Alur: Setelah register, langsung arahkan ke /login (tanpa auto-login)
  redirect('/login?registered=success');
}

// 3. Login User (Admin / Siswa)
export async function loginUser(prevState, formData) {
  const email = formData.get('email')?.trim();
  const password = formData.get('password');

  if (!email || !password) {
    return { error: 'Email dan password wajib diisi!' };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'Email atau password salah!' };
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return { error: 'Email atau password salah!' };
  }

  // Simpan cookie sesi
  const cookieStore = await cookies();
  cookieStore.set('session_user_id', String(user.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  // Redirect: Jika admin ke /admin, jika user/siswa langsung ke Home page (/)
  if (user.role === 'admin') {
    redirect('/admin');
  } else {
    redirect('/');
  }
}

// 4. Logout User
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session_user_id');
  redirect('/login');
}

// 5. Simpan / Update Biodata Siswa (Nama, Jenis Kelamin, Kelas, Alamat, Telepon, Foto Profil)
export async function simpanProfilSiswa(prevState, formData) {
  const user = await getLoggedInUser();
  if (!user) {
    return { error: 'Sesi login tidak valid. Silakan login kembali.' };
  }

  const nama_siswa = formData.get('nama_siswa')?.trim();
  const jenis_kelamin = formData.get('jenis_kelamin');
  const id_kelas = Number(formData.get('id_kelas'));
  const alamat = formData.get('alamat')?.trim() || null;
  const telepon = formData.get('telepon')?.trim() || null;
  const fotoFile = formData.get('foto');

  if (!nama_siswa || !jenis_kelamin || !id_kelas) {
    return { error: 'Nama, Jenis Kelamin, dan Kelas wajib diisi!' };
  }

  // Tetap simpan foto yang sudah ada jika tidak mengunggah foto baru
  let fotoUrl = user.siswa?.foto || null;

  try {
    // Proses foto jika ada file yang dipilih (simpan sebagai Base64 Data URL agar instan dan bebas error 404)
    if (fotoFile && typeof fotoFile === 'object' && fotoFile.size > 0) {
      const bytes = await fotoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = fotoFile.type || 'image/jpeg';
      fotoUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
    }

    if (user.siswa) {
      // Update profil jika data siswa sudah ada
      await prisma.pm_siswa.update({
        where: { user_id: user.id },
        data: {
          nama_siswa,
          jenis_kelamin,
          kelas: id_kelas ? { connect: { id_kelas } } : undefined,
          alamat,
          telepon,
          foto: fotoUrl,
        },
      });
    } else {
      // Buat baru jika belum ada
      await prisma.pm_siswa.create({
        data: {
          nama_siswa,
          jenis_kelamin,
          kelas: id_kelas ? { connect: { id_kelas } } : undefined,
          alamat,
          telepon,
          foto: fotoUrl,
          user: { connect: { id: user.id } },
        },
      });
    }

    revalidatePath('/profil');
    revalidatePath('/profil/edit');
    revalidatePath('/admin');
  } catch (error) {
    console.error('Error simpanProfilSiswa:', error);
    return { error: 'Gagal menyimpan profil: ' + error.message };
  }

  // Arahkan kembali ke halaman tampilan profil setelah sukses
  redirect('/profil');
}

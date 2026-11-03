'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// [15-25m & Helper]: Ambil user aktif dari cookie mentah
export async function getLoggedInUser() {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get('session_user_id')?.value;
  if (!sessionUserId) return null;

  return await prisma.user.findUnique({
    where: { id: Number(sessionUserId) },
  });
}

// [35-85m]: Checkpoint Register
export async function registerUser(prevState, formData) {
  const email = formData.get('email')?.trim();
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');

  // 1. Validasi
  if (!email || !password) return { error: 'Email dan password wajib diisi!' };
  if (password.length < 6) return { error: 'Password minimal 6 karakter!' };
  if (password !== confirmPassword) return { error: 'Konfirmasi password tidak cocok!' };

  // 2. Cek email unik
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: 'Email sudah terdaftar!' };

  // 3. Hash password dengan bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Simpan ke database (role default: siswa)
  await prisma.user.create({
    data: { email, password: hashedPassword, role: 'siswa' },
  });

  // 5. Alihkan ke halaman login
  redirect('/login?registered=success');
}

// [85-120m]: Checkpoint Login
export async function loginUser(prevState, formData) {
  const email = formData.get('email')?.trim();
  const password = formData.get('password');
  if (!email || !password) return { error: 'Email dan password wajib diisi!' };

  // 1. Cari user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: 'Email atau password salah!' };

  // 2. Bandingkan password asli dengan hash di DB
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: 'Email atau password salah!' };

  // 3. Pasang cookie sesi sederhana (ID mentah)
  const cookieStore = await cookies();
  cookieStore.set('session_user_id', String(user.id), {
    httpOnly: true,
    path: '/',
  });

  // 4. Redirect per role
  redirect(user.role === 'admin' ? '/admin' : '/');
}

// [120-140m]: Checkpoint Logout
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session_user_id');
  redirect('/login');
}
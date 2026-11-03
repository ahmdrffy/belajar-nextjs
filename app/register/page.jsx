"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "@/app/auth/actions";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="mb-6 text-center text-gray-800 text-2xl font-bold">
        Daftar Akun Siswa
      </h2>

      {state?.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold mb-1 text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="nama@email.com"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold mb-1 text-gray-700">
            Password (min 6 karakter)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Buat password"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="text-sm font-semibold mb-1 text-gray-700">
            Konfirmasi Password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
            placeholder="Ulangi password"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
        >
          {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="text-blue-600 hover:underline font-medium">
          Login di sini
        </Link>
      </p>
    </div>
  );
}


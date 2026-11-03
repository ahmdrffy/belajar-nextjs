"use client";

import { useActionState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/app/auth/actions";

function RegistrationSuccessAlert() {
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "success";

  if (!isRegistered) return null;

  return (
    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded-md">
      <strong>Pendaftaran Berhasil!</strong> Akun Anda sudah dibuat, silakan login.
    </div>
  );
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="mb-6 text-center text-gray-800 text-2xl font-bold">
        Login Akun
      </h2>

      <Suspense fallback={null}>
        <RegistrationSuccessAlert />
      </Suspense>

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
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Masukkan password"
            className="py-2.5 px-3.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md text-sm font-semibold transition-colors cursor-pointer"
        >
          {isPending ? "Memproses..." : "Masuk"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link href="/register" className="text-blue-600 hover:underline font-medium">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}

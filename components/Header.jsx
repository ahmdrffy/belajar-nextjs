import Link from "next/link";
import Image from "next/image";
import { getLoggedInUser } from "@/app/auth/actions";
import TombolLogout from "@/components/TombolLogout";

export default async function Header() {
  const user = await getLoggedInUser();

  return (
    <header className="bg-[#222] py-3 px-6 sm:px-10 border-b border-[#444] shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo & Judul */}
        <div className="font-bold text-2xl text-white">
          <Link
            href={user?.role === "admin" ? "/admin" : "/"}
            className="inline-flex items-center gap-2"
          >
            <Image src="/next.svg" width={38} height={38} alt="Logo" priority />
            <span className="text-sm font-semibold tracking-wider text-gray-300 hidden sm:inline">
              SMK 21
            </span>
            {user?.role === "admin" && (
              <span className="text-xs px-2 py-0.5 bg-blue-900 border border-blue-700 text-blue-200 rounded font-normal ml-1">
                Admin
              </span>
            )}
          </Link>
        </div>

        {/* Menu Navigasi Berdasarkan Status & Role */}
        <nav className="flex items-center space-x-3 sm:space-x-5 text-sm sm:text-base font-medium text-[#eee]">
          {user ? (
            user.role === "admin" ? (
              // 1. Tampilan Khusus Admin: Menu bersih tanpa menu luar, langsung fokus ke Dashboard & Logout
              <>
                <Link
                  href="/admin"
                  className="hover:text-[#00aaff] transition-colors duration-300 text-sm"
                >
                  Dashboard Siswa
                </Link>
                <TombolLogout />
              </>
            ) : (
              // 2. Tampilan Khusus Siswa: Home, Profil Siswa, dan Tombol Logout di Header 
              <>
                <Link
                  href="/"
                  className="hover:text-[#00aaff] transition-colors duration-300"
                >
                  Home
                </Link>
                <Link 
                  href="/about"
                  className="hover:text-[#00aaff] transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  href="/profil"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Profil Siswa
                </Link>
                <TombolLogout />
              </>
            )
          ) : (
            // 3. Tampilan Tamu (Belum Login): Home, About, Login, Register
            <>
              <Link
                href="/"
                className="hover:text-[#00aaff] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-[#00aaff] transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/login"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

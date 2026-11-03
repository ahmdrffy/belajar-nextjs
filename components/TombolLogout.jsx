"use client";

import { logoutUser } from "@/app/auth/actions";
import { useTransition } from "react";

export default function TombolLogout() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutUser();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-xs sm:text-sm font-medium rounded-md transition-colors cursor-pointer"
    >
      {isPending ? "Keluar..." : "Logout"}
    </button>
  );
}

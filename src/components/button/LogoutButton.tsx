"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      className="text-red-600 bg-white px-2 rounded-lg"
      onClick={() => signOut()}
    >
      Logga ut
    </button>
  );
}

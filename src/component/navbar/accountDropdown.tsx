"use client";

import Link from "next/link";

export default function AccountDropdown() {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
      <ul className="flex flex-col">
        <li>
          <Link
            href="/signin"
            className="block px-4 py-2 hover:bg-red-600 hover:text-white"
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="block px-4 py-2 hover:bg-red-600 hover:text-white"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <button className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white">
            Continue with Google
          </button>
        </li>
      </ul>
    </div>
  );
}

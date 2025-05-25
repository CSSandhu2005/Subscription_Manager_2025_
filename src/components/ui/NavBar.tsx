// src/components/ui/navbar.tsx

import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-zinc-900 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">SubManager</div>
      <div className="space-x-4">
        <Link href="/dashboard">
          <span className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition font-medium">
            Dashboard
          </span>
        </Link>
        <Link href="/dashboard/settings">
          <span className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition font-medium">
            Settings
          </span>
        </Link>
        <Link href="/dashboard/subscriptions">
          <span className="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition font-medium">
            Subscriptions
          </span>
        </Link>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}

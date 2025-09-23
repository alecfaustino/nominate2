"use client";
import Link from "next/link";
import DarkButton from "./darkmode/DarkButton";

interface NavbarProps {
  setIsFilterModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setIsFilterModalOpen }: NavbarProps) {
  return (
    <nav className="w-full sticky top-0 left-0 z-50 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200/20 dark:border-gray-700/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold">
          <Link href="/">NOMinate</Link>
        </div>

        {/* Nav Links */}
        <div className="flex space-x-6 justify-center items-center">
          <p
            className="block md:hidden"
            onClick={() => setIsFilterModalOpen?.((prev) => !prev)}>
            Filters
          </p>

          <Link href="#">Favorites</Link>
          <DarkButton />
        </div>
      </div>
    </nav>
  );
}

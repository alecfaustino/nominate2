import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 left-0 z-50 h-16 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">NOMinate</Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

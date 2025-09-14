import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 left-0 z-50 h-16 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold text-gray-800">
          <Link href="/">MySite</Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-gray-900">
            Services
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* Placeholder for button */}
        <div>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

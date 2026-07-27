import { useState } from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg" onClick={closeMenu}>
        <HomeIcon className="w-7 h-7 text-green-700" />
        HomeServe
        </Link>

        {/* Desktop nav — only shows on genuinely wide screens now */}
        <nav className="hidden lg:flex items-center gap-8 text-sm text-gray-700">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-green-700">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/dashboard" aria-label="My Dashboard" className="text-gray-700 hover:text-green-700">
            <UserCircleIcon className="w-7 h-7" />
          </Link>
          <Link
            to="/admin"
            className="border border-gray-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Admin Panel
          </Link>
          <Link
            to="/booking"
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Book Now
          </Link>
        </div>

        {/* Hamburger — only shows below lg */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 px-6 py-4 space-y-4">
          <nav className="flex flex-col gap-3 text-sm text-gray-700">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeMenu} className="hover:text-green-700">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-700"
            >
              <UserCircleIcon className="w-5 h-5" />
              My Dashboard
            </Link>
            <Link
              to="/admin"
              onClick={closeMenu}
              className="border border-gray-300 text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-gray-50"
            >
              Admin Panel
            </Link>
            <Link
              to="/booking"
              onClick={closeMenu}
              className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-gray-800"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
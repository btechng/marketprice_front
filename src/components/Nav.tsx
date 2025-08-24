import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          Food Prices
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/directory" className="hover:underline">
            Directory
          </Link>
          <Link to="/markets" className="hover:underline">
            Markets
          </Link>
          <Link to="/report" className="px-3 py-1 rounded bg-black text-white">
            Report
          </Link>
          {user?.role === "admin" && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}
          {!user ? (
            <>
              <Link to="https://taskncart.shop" className="hover:underline">
                Shop Here
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <button onClick={logout} className="text-sm text-red-600">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown with Slide + Fade + Outside Close */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white border-t px-4 overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 py-4" : "max-h-0 py-0"
        }`}
      >
        <div
          className={`space-y-2 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to="/directory"
            className="block hover:underline"
            onClick={() => setOpen(false)}
          >
            Directory
          </Link>
          <Link
            to="/markets"
            className="block hover:underline"
            onClick={() => setOpen(false)}
          >
            Markets
          </Link>
          <Link
            to="/report"
            className="block px-3 py-1 rounded bg-black text-white text-center"
            onClick={() => setOpen(false)}
          >
            Report
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="block hover:underline"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          )}
          {!user ? (
            <>
              <Link
                to="https://taskncart.shop"
                className="block hover:underline"
                onClick={() => setOpen(false)}
              >
                Shop Here
              </Link>
              <Link
                to="/login"
                className="block hover:underline"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block hover:underline"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="block text-sm text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

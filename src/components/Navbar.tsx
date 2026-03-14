import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full h-20 z-100 bg-white backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-full">
        {/* LOGO */}
        <div className="flex items-center lg:-ml-10 shrink-0">
          <img
            src="/logo.svg"
            alt="Sharptrax Technologies"
            className="h-30 md:h-20 w-100"
          />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-4 xl:gap-6 text-gray-700 items-center whitespace-nowrap">
          <a href="/" className="hover:text-black">
            Home
          </a>
          <p className="text-gray-300">/</p>
          <a href="/about-us" className="hover:text-black">
            About Us
          </a>
          <p className="text-gray-300">/</p>
          <a href="/services" className="hover:text-black">
            Services
          </a>
          
          <p className="text-gray-300">/</p>
          <a href="/gallery" className="hover:text-black">
            Gallery
          </a>
          <p className="text-gray-300">/</p>
          <a href="/contact" className="hover:text-black">
            Contact Us
          </a>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="bg-black text-white px-4 py-2 lg:-mr-20 whitespace-nowrap text-sm md:text-base shrink-0 hover:bg-gray-800 transition-colors"
          >
            Enquire Now
          </button>

          {/* HAMBURGER ICON - Fixed visibility and animation */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-110 relative"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle Menu"
          >
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                openMenu ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                openMenu ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                openMenu ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-white border-b shadow-lg transition-all duration-300 ease-in-out z-90 ${
          openMenu
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-10 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 text-gray-700 font-medium bg-white">
          <a href="/" onClick={() => setOpenMenu(false)}>
            Home
          </a>
          <a href="/about-us" onClick={() => setOpenMenu(false)}>
            About Us
          </a>
          <a href="/services" onClick={() => setOpenMenu(false)}>
            Services
          </a>
          <a href="#" onClick={() => setOpenMenu(false)}>
            Projects
          </a>
          <a href="/gallery" onClick={() => setOpenMenu(false)}>
            Gallery
          </a>
          <a href="/contact" onClick={() => setOpenMenu(false)}>
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}

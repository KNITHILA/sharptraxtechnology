import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// --- Machine Data for the Dropdown ---
const serviceCategories = [
  {
    id: "welding-automation",
    title: "Welding Automation",
    products: [
      "Robotic Automation",
      "Plasma Transferred Arc Welding System",
      "Welding Rotator",
      "Pull-Through Welding Automation System",
      "MIG-Welding System",
      "TIG Longitudinal Welding SPM",
      "SAW-Submerged Arc Welding",
      "Column And Boom",
      "Port Welding Machine SPM",
      "Head & Tailstock Units",
      "Hydraulic End Cap Welding SPM",
      "TANKWELD-PRO Automated Tank Welding Solution",
      "Robotic Gantry Automation",
      "Robotic Trolley Welding",
      "Material Tilter"
    ]
  },
  {
    id: "welding-positioners",
    title: "Welding Positioners",
    products: [
      "Welding Positioners",
      "L-Type Positioner",
      "Scissor Rollers",
      "Welding Turn Table"
    ]
  },
  {
    id: "cnc-cutting",
    title: "Plasma CNC Cutting Machine",
    products: [
      "Plasma CNC Machine"
    ]
  },
  {
    id: "accessories",
    title: "Machine Accessories",
    products: [
      "Torch Weaving Unit",
      "AVC Unit",
      "Laser Seam Tracking Unit",
      "Welding Torch",
      "Cross Slides"
    ]
  },
  {
    id: "membrane-panel",
    title: "Membrane Panel Welding Machine",
    products: [
      "Membrane Panel Welding System"
    ]
  }
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false); // State for mobile menu
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false); // Desktop dropdown state
  const [activeDesktopCat, setActiveDesktopCat] = useState(serviceCategories[0].id); // Which category is hovered on desktop
  
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false); // Mobile main "Services" accordion
  const [activeMobileCat, setActiveMobileCat] = useState<string | null>(null); // Which sub-category is open on mobile
  
  const navigate = useNavigate();

  // Navigation handler for dropdown items
  const handleProductClick = (categoryId: string, productName: string) => {
    navigate(`/services?cat=${categoryId}&prod=${encodeURIComponent(productName)}`);
    setOpenMenu(false);
    setDesktopServicesOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full h-20 z-[100] bg-white backdrop-blur-md shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-full relative z-[105] bg-white">
        
        {/* LOGO */}
        <div className="flex items-center shrink-0">
          <Link to="/">
            <img
              src="/logo.svg"
              alt="Sharptrax Technologies"
              className="h-10 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-4 xl:gap-6 text-gray-700 items-center whitespace-nowrap h-full">
          <Link to="/" className="hover:text-red-600 transition-colors font-medium">
            Home
          </Link>
          <p className="text-gray-300">/</p>
          <Link to="/about-us" className="hover:text-red-600 transition-colors font-medium">
            About Us
          </Link>
          <p className="text-gray-300">/</p>
          
          {/* SERVICES DROPDOWN (DESKTOP) */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <Link 
              to="/services" 
              className={`flex items-center gap-1 font-medium transition-colors ${desktopServicesOpen ? "text-red-600" : "hover:text-red-600"}`}
            >
              Products & Services
              <svg className={`w-4 h-4 transition-transform duration-300 ${desktopServicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {/* Split-Pane Mega Menu Dropdown */}
            {/* FIX: Increased width to 850px, added whitespace-normal to prevent text cutoff */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[850px] bg-white border border-gray-100 shadow-2xl rounded-b-2xl transition-all duration-300 origin-top overflow-hidden flex flex-col whitespace-normal ${
                desktopServicesOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
              }`}
            >
              {/* FIX: Increased height to 450px to comfortably fit 15 items in 2 columns */}
              <div className="flex h-[450px]">
                {/* Left Side: Category Headings */}
                <div className="w-1/3 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto custom-scrollbar shrink-0">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">Categories</h3>
                  <ul className="space-y-1">
                    {serviceCategories.map((category) => (
                      <li key={category.id}>
                        <button
                          onMouseEnter={() => setActiveDesktopCat(category.id)}
                          className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm transition-all ${
                            activeDesktopCat === category.id
                              ? "bg-white text-red-600 shadow-sm border-l-4 border-red-600"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l-4 border-transparent"
                          }`}
                        >
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Side: Machines for Selected Category */}
                <div className="w-2/3 p-6 bg-white overflow-y-auto custom-scrollbar">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                    {serviceCategories.find(c => c.id === activeDesktopCat)?.title} Systems
                  </h3>
                  
                  {/* FIX: Grid layout improved. Using gap-x-8 for wider columns */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {serviceCategories.find(c => c.id === activeDesktopCat)?.products.map((prod, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleProductClick(activeDesktopCat, prod)}
                        className="w-full text-left text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 p-2.5 rounded-md transition-colors leading-relaxed break-words"
                      >
                        {prod}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
                <Link 
                  to="/services" 
                  onClick={() => setDesktopServicesOpen(false)}
                  className="text-xs font-bold text-gray-900 hover:text-red-600 uppercase tracking-widest transition-colors"
                >
                  View Full Directory →
                </Link>
              </div>
            </div>
          </div>

          <p className="text-gray-300">/</p>
          <Link to="/gallery" className="hover:text-red-600 transition-colors font-medium">
            Gallery
          </Link>
          <p className="text-gray-300">/</p>
          <Link to="/contact" className="hover:text-red-600 transition-colors font-medium">
            Contact Us
          </Link>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <button
            onClick={() => navigate("/contact")}
            className="bg-black text-white px-5 py-2.5 whitespace-nowrap rounded-md text-sm md:text-base font-bold tracking-wide shrink-0 hover:bg-red-600 transition-colors shadow-md"
          >
            Enquire Now
          </button>

          {/* HAMBURGER ICON */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 z-[110] relative shrink-0"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${openMenu ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${openMenu ? "opacity-0" : "opacity-100"}`}></span>
            <span className={`h-0.5 w-6 bg-black transition-all duration-300 ${openMenu ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`lg:hidden absolute top-20 left-0 w-full bg-white border-b shadow-xl transition-all duration-300 ease-in-out z-[90] max-h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar ${
          openMenu ? "translate-y-0 opacity-100 visible" : "-translate-y-10 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-red-600 transition-colors text-lg font-bold" onClick={() => setOpenMenu(false)}>
            Home
          </Link>
          <Link to="/about-us" className="hover:text-red-600 transition-colors text-lg font-bold" onClick={() => setOpenMenu(false)}>
            About Us
          </Link>
          
          {/* MOBILE SERVICES ACCORDION */}
          <div className="flex flex-col border-y border-gray-100 py-3">
            <button 
              className="flex items-center justify-between hover:text-red-600 transition-colors text-lg font-bold w-full text-left"
              onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
            >
              Services
              <svg className={`w-5 h-5 transition-transform duration-300 ${mobileServicesExpanded ? "rotate-180 text-red-600" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Main Services Container */}
            <div className={`flex flex-col overflow-hidden transition-all duration-300 ${mobileServicesExpanded ? "max-h-[2000px] mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
              
              {/* Nested Categories */}
              {serviceCategories.map((category) => (
                <div key={category.id} className="border-b border-gray-50 last:border-none">
                  
                  <button 
                    onClick={() => setActiveMobileCat(activeMobileCat === category.id ? null : category.id)}
                    className="flex items-center justify-between w-full py-3 text-left font-semibold text-gray-800 text-sm hover:text-red-600"
                  >
                    {category.title}
                    <span className="text-gray-400 font-normal text-xl">{activeMobileCat === category.id ? "−" : "+"}</span>
                  </button>

                  {/* The Machines inside the Category */}
                  <div className={`overflow-hidden transition-all duration-300 ${activeMobileCat === category.id ? "max-h-[1000px] mb-3" : "max-h-0"}`}>
                    <ul className="flex flex-col space-y-1 border-l-2 border-red-200 ml-2 pl-4 py-2">
                      {category.products.map((prod, idx) => (
                        <li key={idx}>
                          <button 
                            onClick={() => handleProductClick(category.id, prod)}
                            className="text-gray-500 text-sm hover:text-red-600 text-left w-full whitespace-normal py-1.5 break-words"
                          >
                            {prod}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <Link to="/services" onClick={() => setOpenMenu(false)} className="bg-gray-50 p-3 rounded-lg text-center text-sm font-bold text-gray-900 mt-4 block border border-gray-100 transition-colors hover:bg-gray-100 hover:text-red-600">
                View Full Directory
              </Link>
            </div>
          </div>

          <Link to="/gallery" className="hover:text-red-600 transition-colors text-lg font-bold" onClick={() => setOpenMenu(false)}>
            Gallery
          </Link>
          <Link to="/contact" className="hover:text-red-600 transition-colors text-lg font-bold" onClick={() => setOpenMenu(false)}>
            Contact Us
          </Link>
        </div>
      </div>

      {/* Required CSS to hide scrollbars cleanly inside the dropdown */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}} />
    </nav>
  );
}

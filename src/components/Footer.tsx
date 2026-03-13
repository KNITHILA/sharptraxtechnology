import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function Footer() {
  const [openForm, setOpenForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFooterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    if (!formRef.current) return;

    emailjs
      .sendForm(
        "service_67r7kfg",
        "template_xwnafxs",
        formRef.current,
        "9bJ_hqjsB63RMeUH0",
      )
      .then(() => {
        alert("Enquiry sent successfully!");
        setOpenForm(false);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send enquiry.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <footer
      className="relative pt-16 pb-10 overflow-hidden"
      style={{
        background: "linear-gradient(45deg,#eeeeee 50%,#dddddd 50%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* TOP ROW - Stacks on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 mb-10 text-center md:text-left">
          <img src="/logo.svg" alt="logo" className="h-16 md:h-20 md:-mb-5" />

          <button
            className="border border-gray-400 bg-white px-6 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-colors"
            onClick={() => setOpenForm(true)}
          >
            Contact Us
          </button>
        </div>

        <div className="border-t border-gray-300 mb-10"></div>

        {/* GRID - Stays exactly as you provided */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-sm text-gray-700">
          {/* SERVICES */}
          <div>
            <h3 className="font-semibold mb-3">
              <a href="/services" className="hover:underline">
                Our Services
              </a>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/services?cat=welding-automation&prod=Robotic Automation">
                  Robotic Welding
                </a>
              </li>
              <li>
                <a href="/services?cat=welding-automation&prod=Plasma Transferred Arc Welding System">
                  PTA Welding Systems
                </a>
              </li>
              <li>
                <a href="/services?cat=welding-automation&prod=Welding Rotator">
                  Welding Rotators
                </a>
              </li>
              <li>
                <a href="/services?cat=welding-positioners&prod=Welding Positioners">
                  Welding Positioners
                </a>
              </li>
              <li>
                <a href="/services?cat=cnc-cutting&prod=Plasma CNC Machine">
                  CNC Cutting Machines
                </a>
              </li>
              <li>
                <a href="/services?cat=welding-automation&prod=Port Welding Machine SPM">
                  Special Purpose Machines
                </a>
              </li>
            </ul>
          </div>

          {/* INDUSTRIES */}
          <div>
            <h3 className="font-semibold mb-3">
              <a href="/industries" className="hover:underline">
                Industries We Serve
              </a>
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="/industries?type=heavy-engineering">
                  Heavy Engineering
                </a>
              </li>
              <li>
                <a href="/industries?type=manufacturing">Manufacturing</a>
              </li>
              <li>
                <a href="/industries?type=power-energy">Power & Energy</a>
              </li>
              <li>
                <a href="/industries?type=automotive">Automotive</a>
              </li>
              <li>
                <a href="/industries?type=infrastructure">Infrastructure</a>
              </li>
              <li>
                <a href="/industries?type=special-machinery">
                  Special Machinery
                </a>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div>
            <h3 className="font-semibold mb-3">
              <a href="/location" className="hover:underline">
                Address
              </a>
            </h3>
            <a
              href="/location"
              className="text-gray-600 leading-relaxed hover:underline block"
            >
              166, 11th Main Road, SIDCO Industrial Estate, Thirumudivakkam,
              Chennai – 600040
            </a>
            <p className="mt-4">
              <a href="tel:+919944432149" className="hover:underline">
                📞 +91 99444 32149
              </a>
            </p>
            <p>
              <a href="mailto:sharptrax@yahoo.com" className="hover:underline">
                ✉ sharptrax@yahoo.com
              </a>
            </p>
            <p className="text-gray-600 mt-1">GSTIN: 33AJWPG6450H1ZZ</p>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-semibold mb-3">Follow us</h3>
            <div className="flex gap-3">
              {["f", "x", "in", "ig"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-6 border-t border-gray-200 md:border-none text-xs text-gray-600 gap-4 text-center md:text-left">
          <p>© Copyright Sharptrax Technologies. All Rights Reserved</p>
        </div>

        {/* MODAL FORM - Functional Integration */}
        {openForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Request an Enquiry
              </h2>

              <form
                ref={formRef}
                className="space-y-4"
                onSubmit={handleFooterSubmit}
              >
                <div>
                  <label className="text-sm text-gray-600">Full Name *</label>
                  <input
                    name="user_name"
                    type="text"
                    required
                    minLength={3}
                    className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Email Address *
                  </label>
                  <input
                    name="user_email"
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Phone Number *
                  </label>
                  <input
                    name="user_phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">
                    Requirement Details *
                  </label>
                  <textarea
                    name="project_details"
                    required
                    minLength={10}
                    rows={4}
                    className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpenForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSending ? "Sending..." : "Send Enquiry"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

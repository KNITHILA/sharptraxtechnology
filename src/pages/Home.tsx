import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const solutions = [
  {
    title: "Robotic Automation",
    desc: "At Sharptrax Technologies, we design and integrate robotic welding systems that deliver consistent weld quality, improved productivity, and reduced manual dependency.",
    img: "/screen5/5ma1.svg",
  },
  {
    title: "Welding Positioners",
    desc: "Custom-built welding positioners designed to improve accessibility, accuracy, and productivity in complex welding applications.",
    img: "/screen5/5ma2.svg",
  },
  {
    title: "Plasma Transferred Arc Welding",
    desc: "Our PTA welding systems provide precise hardfacing and cladding solutions with superior material control and repeatability.",
    img: "/screen5/5ma3.svg",
  },
  {
    title: "CNC Cutting Systems",
    desc: "Automated CNC cutting solutions delivering accuracy, efficiency, and clean cuts for industrial fabrication requirements.",
    img: "/screen5/5ma4.svg",
  },
  {
    title: "Welding Rotators",
    desc: "Engineered for safe and efficient rotation of cylindrical components, ensuring uniform weld quality and operator safety.",
    img: "/screen5/5ma5.svg",
  },
  {
    title: "Special Purpose Machines (SPMs)",
    desc: "Tailor-made automation and welding SPMs designed to meet unique production and process requirements.",
    img: "/screen5/5ma6.svg",
  },
];

const logos = [
  "/companylogo/logo (1).svg",
  "/companylogo/logo (2).svg",
  "/companylogo/logo (3).svg",
  "/companylogo/logo (4).svg",
  "/companylogo/logo (5).svg",
  "/companylogo/logo (6).png",
  "/companylogo/logo (7).svg",
  "/companylogo/logo (8).svg",
  "/companylogo/logo (9).svg",
  "/companylogo/logo (10).svg",
  "/companylogo/logo (11).svg",
  "/companylogo/logo (12).svg",
  "/companylogo/logo (13).svg",
  "/companylogo/logo (14).svg",
  "/companylogo/logo (15).svg",
  "/companylogo/logo (16).svg",
  "/companylogo/logo (17).svg",
  "/companylogo/logo (18).svg",
];

const faqs = [
  {
    question: "What Industries Do You Serve With Your Automation Solutions?",
    answer:
      "We provide automation solutions for industries including automotive, heavy manufacturing, fabrication, energy, and industrial production.",
  },
  {
    question: "Do You Offer Customized Welding Automation Solutions?",
    answer:
      "Yes. We specialize in designing fully customized welding automation systems tailored to your production needs.",
  },
  {
    question: "Can You Integrate Automation With Existing Industrial Systems?",
    answer:
      "Our automation solutions are built to integrate seamlessly with existing machines and production lines.",
  },
  {
    question: "How Can I Request A Consultation Or Quote?",
    answer:
      "You can submit a quote request through our website form or contact our engineering team directly.",
  },
];

const row1 = logos.slice(0, 9);
const row2 = logos.slice(9, 18);

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerCity: "",
    customerPhone: "",
    projectMessage: "",
  });

  const [validationErrors, setValidationErrors] = useState<{
    customerName?: string;
    customerEmail?: string;
    customerCity?: string;
    customerPhone?: string;
    projectMessage?: string;
  }>({});
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleQuoteInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setQuoteFormData({
      ...quoteFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateQuoteForm = () => {
    let errors: {
      customerName?: string;
      customerEmail?: string;
      customerCity?: string;
      customerPhone?: string;
      projectMessage?: string;
    } = {};

    if (!quoteFormData.customerName.trim())
      errors.customerName = "Name is required";

    if (!quoteFormData.customerEmail.trim()) {
      errors.customerEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(quoteFormData.customerEmail)) {
      errors.customerEmail = "Invalid email";
    }

    if (!quoteFormData.customerCity.trim())
      errors.customerCity = "City is required";

    if (!quoteFormData.customerPhone.trim()) {
      errors.customerPhone = "Phone number required";
    } else if (!/^\d{10}$/.test(quoteFormData.customerPhone)) {
      errors.customerPhone = "Number must be 10 digits";
    }

    if (!quoteFormData.projectMessage.trim())
      errors.projectMessage = "Message is required";

    return errors;
  };

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateQuoteForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert("Quote request submitted successfully!");
      console.log(quoteFormData);
    }
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen hero-font">
      {/* NAVBAR */}
      <div className="fixed top-0 w-full h-20 z-50 bg-white backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
          {/* LOGO */}
          <div className="flex items-center -mt-2 -ml-10">
            <img
              src="/logo.svg"
              alt="Sharptrax Technologies"
              className="h-16 w-auto"
            />
          </div>

          {/* MENU */}
          <div className="hidden md:flex gap-6 text-gray-700 items-center">
            <a href="#">Home</a>
            <p>/</p>
            <a href="#">About Us</a>
            <p>/</p>
            <a href="#">Services</a>
            <p>/</p>
            <a href="#">Projects</a>
            <p>/</p>
            <a href="#">Gallery</a>
            <p>/</p>
            <a href="#">Contact Us</a>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setOpenForm(true)}
            className="bg-black text-white px-5 py-2 -mr-25 mt-1"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <source src="/welding.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* HERO TEXT */}
        <div className="relative z-10 mt-12 h-full flex items-center">
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-7xl px-16 text-white"
          >
            <h1 className="text-8xl font-bold leading-[0.9] hero-font">
              BEYOND JUST <br />
              <span className="ml-1">WELDING</span>
            </h1>

            <p className="ml-4 text-sm tracking-widest text-gray-200 hero-font">
              YOUR ONE-STOP PARTNER FOR WELDING & CUTTING
              <br />
              AUTOMATION SOLUTIONS
            </p>

            <div className="flex gap-4 mt-8 ml-10">
              <button
                onClick={() => setOpenForm(true)}
                className="bg-white text-black px-6 py-3 shadow-2xl rounded-lg"
              >
                Enquire Now
              </button>

              <button className="bg-black text-white shadow-2xl px-6 py-3 rounded-lg">
                Explore Solutions
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {openForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">
            {/* Close Button */}
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
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setOpenForm(false);
              }}
            >
              {/* Name */}
              <div>
                <label className="text-sm text-gray-600">Full Name *</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  pattern=".*\S.*"
                  title="Please enter at least 3 characters"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Email Address *</label>
                <input
                  type="email"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Please enter a valid email"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-600">Phone Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                />
              </div>

              {/* Requirement */}
              <div>
                <label className="text-sm text-gray-600">
                  Requirement Details *
                </label>
                <textarea
                  required
                  minLength={10}
                  title="Please enter at least 10 characters"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-3 mt-1 focus:outline-none focus:border-black"
                ></textarea>
              </div>

              {/* Buttons */}
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
                  className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Engineering section */}
      <section className="relative w-full py-32 bg-gray-100 overflow-hidden">
        {/* BACKGROUND GRID */}
        <div
          className="absolute inset-0 opacity-60 -mt-30"
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: "url('/2nd-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-10 items-center">
          {/* LEFT SIDE IMAGE */}
          <div className="relative">
            <img
              src="/2nd-img1.svg"
              className="rounded-3xl  w-full object-cover -mt-60"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-5xl font-bold text-gray-900 leading-[1.1]">
              Engineering <br />
              Excellence Since <br />
              2005
            </h2>

            <p className="mt-6 text-gray-600 max-w-xl">
              Since its establishment in 2005, Sharptrax Technologies has
              focused strongly on engineering excellence, automation quality,
              reliability, and long-term customer partnerships. Our core
              strength lies in delivering advanced welding and cutting
              automation systems for demanding industrial applications.
            </p>

            {/* STATS */}
            <div className="flex gap-16 mt-10">
              <div>
                <h3 className="text-7xl font-bold text-red-500">20+</h3>
                <p className="text-gray-600 text-sm mt-1 ml-1">
                  Years of Experience
                </p>
              </div>

              <div>
                <h3 className="text-7xl font-bold text-red-500">5+</h3>
                <p className="text-gray-600 text-sm mt-1 ml-1">
                  Global automation partners
                </p>
              </div>
            </div>

            {/* SMALL IMAGE */}
            <div className="mt-5">
              <img
                src="/2nd-img2.svg"
                className="rounded-2xl shadow-lg w-100 ml-12 "
              />
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div className="relative max-w-7xl mx-auto px-10 -mt-55">
          <h3 className="text-2xl font-bold text-gray-800">
            The Sharptrax Technologies Facility
          </h3>

          <p className="text-gray-600 max-w-6/12 mt-3">
            We specialize in the design and manufacturing of advanced welding
            automation systems, robotic welding solutions, and special purpose
            machines. Our systems are engineered for precision, durability, and
            seamless integration into industrial production environments.
          </p>
        </div>
      </section>

      <section
        className="relative h-screen w-full flex flex-col justify-center px-16"
        style={{
          backgroundImage: "url('/3nd-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl text-white  ml-30 mb-20">
          {/* SMALL LABEL */}
          <p className="text-[70%] tracking-[3px] uppercase text-gray-200 inline-block px-3 py-1 mb-4 hero-font">
            Built on Precision, Engineering & Trust
          </p>

          {/* TITLE */}
          <h1 className="text-6xl font-bold leading-[0.9] hero-font -mt-3 ml-2">
            Sharptrax <br />
            Technologies
          </h1>
        </div>

        {/* FEATURE BOXES */}
        <div className="relative z-10 mt-30 grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto justify-between">
          <div className="glass-box h-60 w-[60.25]">
            <div className="mb-3">
              <img src="/Comp3/comp3-1.svg" className="w-13 h-13" />
            </div>
            <p className="mt-14 text-xl">Advanced automation systems</p>
          </div>

          <div className="glass-box h-60 w-[60.25]">
            <div className="mb-3">
              <img src="/Comp3/comp3-2.svg" className="w-13 h-13" />
            </div>
            <p className="mt-14 text-xl">High-precision welding solutions</p>
          </div>

          <div className="glass-box h-60 w-[60.25]">
            <div className="mb-3">
              <img src="/Comp3/comp3-3.svg" className="w-13 h-13" />
            </div>
            <p className="mt-14 text-xl">Proven industrial performance</p>
          </div>

          <div className="glass-box h-60 w-[60.25]">
            <div className="mb-3">
              <img src="/Comp3/comp3-4.svg" className="w-13 h-13" />
            </div>
            <p className="mt-14 text-xl">Reliable project delivery</p>
          </div>

          <div className="glass-box h-60 w-[60.25]">
            <div className="mb-3">
              <img src="/Comp3/comp3-5.svg" className="w-13 h-13" />
            </div>
            <p className="mt-14 text-xl">Customer-focused engineering</p>
          </div>
        </div>
      </section>
      <section
        className="relative h-screen w-full flex flex-col justify-center px-16"
        style={{
          backgroundImage: "url('/4th-bg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>
      {/* 5th page----Automation Solutions */}

      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-center text-5xl font-semibold mb-20 hero-font">
            <span className="text-red-500">Automation</span>{" "}
            <span className="text-gray-800">Solutions</span>
          </h2>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-x-24 gap-y-16">
            {solutions.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-8"
              >
                {/* Text */}
                <div className="max-w-sm">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

                  <button className="border border-red-400 text-red-500 px-4 py-1 rounded-full text-sm hover:bg-red-50">
                    Learn More
                  </button>
                </div>

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-44 object-contain"
                />
              </div>
            ))}
          </div>

          {/* Bottom Button */}
          <div className="flex justify-center mt-16">
            <button className="border px-6 py-2 rounded-md hover:bg-gray-200">
              Enquire Now
            </button>
          </div>
        </div>
      </section>
      {/* 6TH PAGE */}
      <section className="py-20 bg-gray-100 overflow-hidden">
        <h2 className="text-center text-4xl mb-16 tracking-widest">
          OUR VALUABLE CLIENTS
        </h2>

        {/* ROW 1 */}
        <div className="overflow-hidden mb-14">
          <div className="flex gap-20 scroll-right w-max">
            {[...row1, ...row1].map((logo, i) => (
              <img
                key={i}
                src={logo}
                className="h-10 opacity-70 hover:opacity-100 transition"
                alt="client logo"
              />
            ))}
          </div>
        </div>

        {/* ROW 2 */}
        <div className="overflow-hidden">
          <div className="flex gap-20 scroll-left w-max">
            {[...row2, ...row2].map((logo, i) => (
              <img
                key={i}
                src={logo}
                className="h-10 opacity-70 hover:opacity-100 transition"
                alt="client logo"
              />
            ))}
          </div>
        </div>
      </section>
      {/* 7th page */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/3nd-bg.svg')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-10 flex justify-between items-center">
          {/* LEFT TEXT */}
          <div className="text-white max-w-xl -mt-75">
            <p className="text-xs tracking-widest mb-2 inline-block px-2 py-1">
              REQUEST A QUOTE
            </p>

            <h1 className="text-5xl font-bold leading-[1.1] mb-6">
              Ready to Start Your
              <br />
              Automation Project?
            </h1>

            <p className="text-gray-200 text-sm leading-relaxed mr-3">
              For more information about our automation solutions or to request
              a quote, connect with the Sharptrax Technologies team today.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleQuoteSubmit}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 w-105 text-white"
          >
            <h2 className="text-2xl font-semibold mb-6">Request a Quote</h2>

            {/* NAME + EMAIL */}
            <div className="flex gap-3 mb-4">
              <div className="flex flex-col w-1/2">
                <input
                  name="customerName"
                  value={quoteFormData.customerName}
                  onChange={handleQuoteInputChange}
                  type="text"
                  placeholder="Your Name *"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none"
                />
                {validationErrors.customerName && (
                  <span className="text-red-400 text-xs mt-1">
                    {validationErrors.customerName}
                  </span>
                )}
              </div>

              <div className="flex flex-col w-1/2">
                <input
                  name="customerEmail"
                  value={quoteFormData.customerEmail}
                  onChange={handleQuoteInputChange}
                  type="email"
                  placeholder="Your Email *"
                  className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none"
                />
                {validationErrors.customerEmail && (
                  <span className="text-red-400 text-xs mt-1">
                    {validationErrors.customerEmail}
                  </span>
                )}
              </div>
            </div>

            {/* CITY */}
            <div className="flex flex-col mb-4">
              <input
                name="customerCity"
                value={quoteFormData.customerCity}
                onChange={handleQuoteInputChange}
                type="text"
                placeholder="City *"
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none"
              />
              {validationErrors.customerCity && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.customerCity}
                </span>
              )}
            </div>

            {/* PHONE */}
            <div className="flex flex-col mb-4">
              <input
                name="customerPhone"
                value={quoteFormData.customerPhone}
                onChange={handleQuoteInputChange}
                type="text"
                placeholder="Phone number *"
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none"
              />
              {validationErrors.customerPhone && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.customerPhone}
                </span>
              )}
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col mb-5">
              <textarea
                name="projectMessage"
                value={quoteFormData.projectMessage}
                onChange={handleQuoteInputChange}
                placeholder="Message *"
                rows={3}
                className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 placeholder-gray-300 outline-none"
              />
              {validationErrors.projectMessage && (
                <span className="text-red-400 text-xs mt-1">
                  {validationErrors.projectMessage}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Send
            </button>

            <p className="text-xs text-gray-300 mt-4 leading-relaxed">
              At Sharptrax Technologies, your privacy is important to us. All
              shared information is kept confidential and secure.
            </p>
          </form>
        </div>
      </section>
      {/* 8th PAGE */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-6xl font-semibold text-center mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="border border-gray-400 rounded-2xl bg-white overflow-hidden"
                >
                  {/* Question */}
                  <div
                    className="flex justify-between items-center px-8 py-6 cursor-pointer"
                    onClick={() => toggle(index)}
                  >
                    <p className="font-medium text-gray-800">{faq.question}</p>

                    {/* Rotating Icon */}
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full bg-black text-white text-xl transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </div>
                  </div>

                  {/* Animated Answer */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-8 pb-6 text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* TESTIMONIAL SECTION */}
      <section className="relative py-32 bg-white gradient-to-tr from-gray-100 to-white overflow-hidden">
        <div className="max-w-6xl mx-auto  flex items-center gap-28">
          {/* LEFT IMAGE BLOCK */}
          <div className="relative w-250 h-250 shrink-0 -ml-45 -mt-50">
            {/* IMAGE (contains blue graphic + photo) */}
            <img
              src="/ceoimg.svg"
              alt="CEO testimonial"
              className="w-full object-contain"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative max-w-xl -mt-6 -ml-[42%]">
            {/* NAME */}
            <h2 className="text-5xl font-bold tracking-wide">GANESH</h2>

            {/* ROLE */}
            <p className="text-gray-500 text-lg mb-6">
              Regional Markets Executive
            </p>

            {/* TESTIMONIAL BOX */}
            <div className="bg-white shadow-xl px-6 py-4 rounded-lg text-gray-700 text-sm leading-relaxed">
              " Their robotic welding solutions helped us reduce manual errors
              and increase output. Sharptrax is our go-to partner for all
              automation needs! "
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      <footer
        className="relative pt-16 pb-10 overflow-hidden"
        style={{
          background: "linear-gradient(45deg,#eeeeee 50%,#dddddd 50%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-10">
          {/* TOP ROW */}
          <div className="flex justify-between items-center mb-10">
            <img src="/logo.svg" className="h-20 -mb-5" />

            <a
              href="/contact"
              className="border border-gray-400 bg-white px-6 py-2 rounded-full shadow-sm hover:bg-gray-200"
            >
              Contact Us
            </a>
          </div>

          <div className="border-t border-gray-300 mb-10"></div>

          {/* GRID */}
          <div className="grid grid-cols-4 gap-12 text-sm text-gray-700">
            {/* SERVICES */}
            <div>
              <h3 className="font-semibold mb-3">
                <a href="/services" className="hover:underline">
                  Our Services
                </a>
              </h3>

              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="/services/robotic-welding">Robotic Welding</a>
                </li>
                <li>
                  <a href="/services/pta-welding">PTA Welding Systems</a>
                </li>
                <li>
                  <a href="/services/rotators">Welding Rotators</a>
                </li>
                <li>
                  <a href="/services/positioners">Welding Positioners</a>
                </li>
                <li>
                  <a href="/services/cnc">CNC Cutting Machines</a>
                </li>
                <li>
                  <a href="/services/spm">Special Purpose Machines</a>
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
                  <a href="/industries/heavy-engineering">Heavy Engineering</a>
                </li>
                <li>
                  <a href="/industries/manufacturing">Manufacturing</a>
                </li>
                <li>
                  <a href="/industries/power-energy">Power & Energy</a>
                </li>
                <li>
                  <a href="/industries/automotive">Automotive</a>
                </li>
                <li>
                  <a href="/industries/infrastructure">Infrastructure</a>
                </li>
                <li>
                  <a href="/industries/machinery">Special Machinery</a>
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
                className="text-gray-600 leading-relaxed hover:underline"
              >
                166, 11th Main Road, SIDCO Industrial Estate, Thirumudivakkam,
                Chennai – 600040
              </a>

              <p className="mt-2">
                <a href="tel:+919944432149" className="hover:underline">
                  📞 +91 99444 32149
                </a>
              </p>

              <p>
                <a
                  href="mailto:sharptrax@yahoo.com"
                  className="hover:underline"
                >
                  ✉ sharptrax@yahoo.com
                </a>
              </p>

              <p className="text-gray-600">GSTIN: 33AJWPG6450H1ZZ</p>
            </div>

            {/* SOCIAL */}
            <div>
              <h3 className="font-semibold mb-3">Follow us</h3>

              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200"
                >
                  f
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200"
                >
                  x
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200"
                >
                  in
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-200"
                >
                  ig
                </a>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between items-center mt-16 text-xs text-gray-600">
            <p>© Copyright Sharptrax Technologies. All Rights Reserved</p>

            <div className="flex gap-6">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
              <a href="/refunds">Sales and Refunds</a>
              <a href="/legal">Legal</a>
              <a href="/location" className="hover:underline">
                Address
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

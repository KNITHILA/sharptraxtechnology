import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

// --- Types for better structure ---
interface Product {
  name: string;
  desc: string;
  features?: string[];
  imgs: string[];
  video?: string;
}

interface Category {
  id: string;
  title: string;
  products: Product[];
}

const categories: Category[] = [
  {
    id: "welding-automation",
    title: "Welding Automation",
    products: [
      {
        name: "Robotic Automation",
        desc: "Robotic automation is at the core of Sharptrax Technologies’ advanced welding solutions. With cutting-edge robotic welding systems, we help industries achieve higher precision, efficiency, and productivity in their manufacturing processes. Sharptrax Technologies offers over 20 years of experience as a leader and innovator integrating automation and robotics for the welding industry.",
        features: [
          "Our robotic systems can be seamlessly integrated into existing production lines, ensuring minimal disruption and maximum efficiency.",
          "Robots deliver consistent weld quality, reducing errors and minimizing material wastage.",
        ],
        imgs: [
          "/servicemachines/welding automation/1/mac1.1.jpg",
          "/servicemachines/welding automation/1/mac1.2.jpg",
          "/servicemachines/welding automation/1/mac1.3.jpg",
          "/servicemachines/welding automation/1/mac1.4.jpg",
        ],
        video: "/servicemachines/welding automation/1/mac1.mp4",
      },
      {
        name: "Plasma Transferred Arc Welding System",
        desc: " Plasma Transferred Arc (PTA) Welding is a highly advanced and precise welding process designed for hard-facing, cladding, and high-quality metal deposition. At Sharptrax Technologies, we specialize in PTA welding solutions that enhance the durability and performance of industrial components, reducing wear and tear in extreme working conditions. ",
        features: [
          "The system enables high-precision metering of metallic powder, significantly reducing material waste and lowering overall costs compared to traditional welding methods.",
          "Designed for seamless integration into automated workflows, PTAW ensures consistent, high-quality hardfacing results with exceptional repeatability.",
        ],
        imgs: [
          "/servicemachines/welding automation/2/mac2.1.jpg",
          "/servicemachines/welding automation/2/mac2.2.jpg",
          "/servicemachines/welding automation/2/mac2.3.jpg",
          "/servicemachines/welding automation/2/mac2.4.jpg",
        ],
        video: "/servicemachines/welding automation/2/mac2.mp4",
      },
      {
        name: "Welding Rotator",
        desc: "At Sharptrax Technologies, our welding Welding rotators are designed to enhance efficiency, precision, and safety in welding operations. These automated positioning systems help in rotating cylindrical workpieces, ensuring uniform welding and reduced manual effort..",
        features: [
          "Available in various weight load capacities ranging from 5 tonnes to 200 tonnes to suit heavy-duty industrial needs.",
          "Offers versatile variants including Self-centric Welding Rotators and Conventional Rotator systems.",
          "Highly adaptable design capable of accommodating vessel diameters ranging from 150 mm to 8000 mm.",
          "Fully customizable configurations available to meet specific project requirements and workshop layouts.",
        ],
        imgs: [
          "/servicemachines/welding automation/3/mac3.1.jpg",
          "/servicemachines/welding automation/3/mac3.2.jpg",
          "/servicemachines/welding automation/3/mac3.3.jpg",
          "/servicemachines/welding automation/3/mac3.4.jpg",
        ],
        video: "https://www.youtube.com/embed/cBOZVaN1GsM?si=LuCX_UTH5Y9NGtGj",
      },
      {
        name: "Pull-Through Welding Automation System",
        desc: "At Sharptrax Technologies, our Pull-Through Welding Automation System is designed to enhance productivity, consistency, and precision in welding applications. This advanced system automates the welding process for long and continuous workpieces, ensuring seamless joint quality and reduced manual intervention.",
        imgs: [
          "/servicemachines/welding automation/4/mac4.1.jpg",
          "/servicemachines/welding automation/4/mac4.2.jpg",
          "/servicemachines/welding automation/4/mac4.3.jpg",
          "/servicemachines/welding automation/4/mac4.4.jpg",
        ],
        video: "https://www.youtube.com/embed/G5TqVsDJ62o?si=METj7Kg_ixayYyuS",
      },
      {
        name: "MIG-Welding System",
        desc: "At Sharptrax Technologies, our MIG-Welding System is designed for high-speed, high-quality welding, making it ideal for industrial and manufacturing applications. Using Metal Inert Gas (MIG) welding, this system provides strong, precise, and efficient welds across various materials, including mild steel, stainless steel, and aluminum.",
        imgs: [
          "/servicemachines/welding automation/5/mac5.1.jpg",
          "/servicemachines/welding automation/5/mac5.2.jpg",
          "/servicemachines/welding automation/5/mac5.3.jpg",
          "/servicemachines/welding automation/5/mac5.4.jpg",
        ],
        video: "https://www.youtube.com/embed/Z9gzJC5pDxM?si=ww20AIUTtnhd93lq",
      },
      {
        name: "TIG Longitudinal Welding SPM",
        desc: "At Sharptrax Technologies, our TIG-Linear Welding SPM (Special Purpose Machine) is designed for high-precision linear welding applications. This system utilizes Tungsten Inert Gas (TIG) welding, ensuring clean, strong, and defect-free welds with superior control and consistency. It is ideal for industries requiring fine, high-quality welding on long and straight workpieces.",
        imgs: [
          "/servicemachines/welding automation/6/mac6.1.jpg",
          "/servicemachines/welding automation/6/mac6.2.jpg",
          "/servicemachines/welding automation/6/mac6.3.jpg",
          "/servicemachines/welding automation/6/mac6.4.jpg",
        ],
        video: "https://www.youtube.com/embed/cwhK_j6G0Jk?si=U_lvArkXTWm9FX8j",
      },
      {
        name: "SAW-Submerged Arc Welding",
        desc: "At Sharptrax Technologies, our Submerged Arc Welding (SAW) system is engineered for high-deposition, deep-penetration welding that ensures strong, defect-free welds with minimal spatter. SAW is widely used in industries that require high-strength, heavy-duty welding applications, such as shipbuilding, structural fabrication, and pipeline construction.",
        imgs: [
          "/servicemachines/welding automation/7/mac7.1.jpg",
          "/servicemachines/welding automation/7/mac7.2.jpg",
          "/servicemachines/welding automation/7/mac7.3.jpg",
          "/servicemachines/welding automation/7/mac7.4.jpg",
        ],
      },
      {
        name: "Column And Boom",
        desc: "At Sharptrax Technologies, we provide high-performance Column and Boom welding systems, designed to enhance precision, efficiency, and automation in welding processes. Our customized solutions cater to industries requiring high-quality, consistent, and automated welding operations for large structures and complex fabrication.",
        imgs: [
          "/servicemachines/welding automation/8/mac8.1.jpg",
          "/servicemachines/welding automation/8/mac8.2.jpg",
          "/servicemachines/welding automation/8/mac8.3.jpg",
          "/servicemachines/welding automation/8/mac8.4.jpg",
        ],
      },
      {
        name: "Port Welding Machine SPM",
        desc: "At Sharptrax Technologies, we specialize in providing customized Port Welding Machine SPM (Special Purpose Machine) designed for high-precision and efficient welding operations in various industries. Our SPM solutions ensure enhanced productivity, accuracy, and automation, reducing manual labor and operational costs.",
        features: [
          "Automated & High-Precision Welding – Ensures consistent weld quality and high accuracy with minimal human intervention.",
          "Custom-Built for Specific Applications – Provides tailored engineering solutions designed to meet unique and complex industrial requirements.",
        ],
        imgs: [
          "/servicemachines/welding automation/9/mac9.1.jpg",
          "/servicemachines/welding automation/9/mac9.2.jpg",
          "/servicemachines/welding automation/9/mac9.3.jpg",
          "/servicemachines/welding automation/9/mac9.4.jpg",
        ],
        video: "/servicemachines/welding automation/9/mac9.mp4",
      },
      {
        name: "Head & Tailstock Units",
        desc: "Sharptrax offers very high quality Head & Tailstock Units, which can be used to hold various components for welding, customised solution is also available in Sharptrax.",
        features: [
          "Synchronized Vertical Adjustment – Features precise vertical height control synchronized across both Head & Tailstock units.",
          "High Payload Versatility – Available in various configurations to support load capacities ranging up to 50 tonnes.",
          "Robust Construction – Engineered with a solid frame designed specifically for superior weight balancing and durability.",
          "Precision Positioning – Motorized and Servo-driven options are available to ensure micron-level positioning accuracy.",
          "Economical Pipe Handling – Provides a practical and cost-effective solution for all industrial pipe holding requirements.",
          "Robotic Integration – Designed for seamless synchronization with external robots to create fully automated welding cells.",
          "High Operational Efficiency – Delivers a high strength-to-weight ratio ensuring efficient handling of heavy workpieces.",
        ],
        imgs: [
          "/servicemachines/welding automation/10/mac10.1.jpg",
          "/servicemachines/welding automation/10/mac10.2.jpg",
          "/servicemachines/welding automation/10/mac10.3.jpg",
          "/servicemachines/welding automation/10/mac10.4.jpg",
        ],
      },

      {
        name: "Hydraulic End Cap Welding SPM",
        desc: "The Hydraulic End Cap Welding SPM is a specialized machine designed for precise and efficient welding of end caps with hydraulic control. It ensures stable positioning, uniform weld quality, and enhanced productivity for industrial applications.",
        features: [
          "Advanced PLC Control – Utilizes a PLC-controlled weld sequence for precise automation and consistent weld bead quality.",
          "Integrated Steady Rest – Equipped with a steady rest to ensure stable support and ease of operation during loading and unloading.",
          "Flexible Diameter Capacity – Available in various sizes to accommodate workpiece diameters ranging from 50 mm to 300 mm.",
          "Heavy-Duty Construction – Features a solid, robust build optimized for superior weight balancing and vibration-free operation.",
          "Advanced PLC Control – Utilizes a PLC-controlled weld sequence for precise automation and consistent weld bead quality.",
          "Multi-Job Programming – Supports multi-program storage, allowing users to program and switch between different job specifications easily.",
        ],
        imgs: [
          "/servicemachines/welding automation/11/mac11.1.jpg",
          "/servicemachines/welding automation/11/mac11.2.jpg",
          "/servicemachines/welding automation/11/mac11.3.jpg",
          "/servicemachines/welding automation/11/mac11.4.jpg",
        ],
      },
      {
        name: "Robotic Gantry Automation",
        desc: "Robotic Gantry Automation is a cornerstone of Sharptrax Technologies’ heavy-duty manufacturing solutions. By utilizing overhead gantry systems integrated with high-performance robotics, we provide expansive work envelopes and superior flexibility for large-scale welding and assembly tasks.",
        features: [
          "Overhead configurations maximize floor space and allow for handling large, heavy workpieces.",
          "Multi-axis gantry movement combined with robotic precision ensures consistent, high-quality welds.",
        ],
        imgs: [
          "/servicemachines/welding automation/12/mac12.1.jpg",
          "/servicemachines/welding automation/12/mac12.2.jpg",
          "/servicemachines/welding automation/12/mac12.3.jpg",
          "/servicemachines/welding automation/12/mac12.4.jpg",
        ],
      },
      {
        name: "Robotic Trolley Welding",
        desc: "Sharptrax Technologies’ Robotic Trolley Welding systems provide an agile solution for manufacturing environments requiring mobility and flexibility. By mounting robotic arms on synchronized automated trolleys, we enable the system to traverse linear tracks.",
        features: [
          "Linear track integration allows for a single robotic unit to service multiple welding fixtures.",
          "High-precision servo-driven trolleys ensure seamless synchronization.",
        ],
        imgs: [
          "/servicemachines/welding automation/13/mac13.1.jpg",
          "/servicemachines/welding automation/13/mac13.2.jpg",
        ],
      },
      {
        name: "Material Tilter",
        desc: "Sharptrax Technologies’ Material Tilters are engineered for high-stability tilting of heavy job components across diverse industrial applications. Built with a solid construction for optimal weight balancing.",
        features: [
          "Available in both motorized and hydraulic-based configurations.",
          "Advanced PLC and servo-controlled options available for high precision.",
        ],
        imgs: [
          "/servicemachines/welding automation/14/mac14.1.jpg",
          "/servicemachines/welding automation/14/mac14.2.jpg",
          "/servicemachines/welding automation/14/mac14.3.jpg",
          "/servicemachines/welding automation/14/mac14.4.jpg",
        ],
      },
    ],
  },
  {
    id: "welding-positioners",
    title: "Welding Positioners",
    products: [
      {
        name: "Welding Positioners",
        desc: "At Sharptrax Technologies, our welding positioners are designed to enhance efficiency, precision, and safety in welding operations. These advanced positioning systems allow welders to rotate and tilt workpieces into the optimal position.",
        features: [
          "Wide Load Capacity Range – Available from 50 kg to 20 tons.",
          "Adjustable Center of Gravity – Engineered for 75 mm to 300 mm ranges.",
        ],
        imgs: [
          "/servicemachines/welding positioners/1/pos1.1.jpg",
          "/servicemachines/welding positioners/1/pos1.2.jpg",
          "/servicemachines/welding positioners/1/pos1.3.jpg",
          "/servicemachines/welding positioners/1/pos1.4.jpg",
        ],
        video: "https://www.youtube.com/embed/o1akniqVvt0?si=mPwanL_oIURSJjcU",
      },
      {
        name: "L-Type Positioner",
        desc: "Sharptrax offers extensive range of L type Positioners for manipulating various types of components, Servo/VFD driven for positioning the arms.",
        features: [
          "Full Rotational Range – Equipped with 360-degree rotation.",
          "Dual-Axis Servo Control – Powered by high-performance servo drives.",
        ],
        imgs: [
          "/servicemachines/welding positioners/2/pos2.1.jpg",
          "/servicemachines/welding positioners/2/pos2.2.jpg",
          "/servicemachines/welding positioners/2/pos2.3.jpg",
          "/servicemachines/welding positioners/2/pos2.4.jpg",
        ],
      },
      {
        name: "Scissor Rollers",
        desc: "Sharptrax offers very high quality Scissor Rollers, which can be used to hold your pipe as a support for your existing machines.",
        imgs: [
          "/servicemachines/welding positioners/3/pos3.1.jpg",
          "/servicemachines/welding positioners/3/pos3.2.jpg",
          "/servicemachines/welding positioners/3/pos3.3.jpg",
          "/servicemachines/welding positioners/3/pos3.4.jpg",
        ],
      },
      {
        name: "Welding Turn Table",
        desc: "We offer excellent quality range of Welding Positioners (Manipulators) that are made from quality raw material. Widely used in various industrial applications.",
        imgs: [
          "/servicemachines/welding positioners/4/pos4.1.jpg",
          "/servicemachines/welding positioners/4/pos4.2.jpg",
          "/servicemachines/welding positioners/4/pos4.3.jpg",
          "/servicemachines/welding positioners/4/pos4.4.jpg",
        ],
      },
    ],
  },
  {
    id: "cnc-cutting",
    title: "Plasma CNC Cutting Machine",
    products: [
      {
        name: "Plasma CNC Machine",
        desc: "At Sharptrax Technologies, we specialize in trading high-quality Plasma CNC Cutting Machines designed for precision cutting, high-speed performance, and superior efficiency.",
        features: [
          "High-Precision Cutting – Accurate cuts across various metal thicknesses.",
          "CNC-Controlled Automation – User-friendly programming interfaces.",
        ],
        imgs: [
          "/servicemachines/plasma cnc/mac1.1.jpg",
          "/servicemachines/plasma cnc/mac1.2.jpg",
          "/servicemachines/plasma cnc/mac1.3.jpg",
          "/servicemachines/plasma cnc/mac1.4.jpg",
        ],
      },
    ],
  },
  {
    id: "accessories",
    title: "Machine Accessories",
    products: [
      {
        name: "Torch Weaving Unit",
        desc: "At Sharptrax Technologies, our Torch Weaving Unit is designed to enhance welding precision by introducing a controlled weaving motion to the welding torch.",
        features: [
          "Precise Width Control – Offers a 0 – 40 mm weaving width.",
          "Advanced Linear Motion – Ball screw transmission for maximum durability.",
        ],
        imgs: [
          "/servicemachines/machine accessories/1/acc1.1.jpg",
          "/servicemachines/machine accessories/1/acc1.2.jpg",
          "/servicemachines/machine accessories/1/acc1.3.jpg",
          "/servicemachines/machine accessories/1/acc1.4.jpg",
        ],
      },
      {
        name: "AVC Unit",
        desc: "Automatic Voltage Controller (AVC) unit for TIG and Plasma welding process. Built with LM guideway slides and Servo Motors.",
        imgs: [
          "/servicemachines/machine accessories/2/acc2.1.jpg",
          "/servicemachines/machine accessories/2/acc2.2.jpg",
        ],
      },
      {
        name: "Laser Seam Tracking Unit",
        desc: "Our Laser Seam Tracking Unit enables tracking of almost all weld joints to avoid manual intervention. Compatible with all major robot brands.",
        features: [
          "Automatic Real-Time Detection – Adjusts to seam variations during operation.",
          "Precision Laser Guidance – Ensures the torch follows exact seam path.",
        ],
        imgs: [
          "/servicemachines/machine accessories/3/acc3.1.jpg",
          "/servicemachines/machine accessories/3/acc3.2.jpg",
          "/servicemachines/machine accessories/3/acc3.3.jpg",
          "/servicemachines/machine accessories/3/acc3.4.jpg",
        ],
      },
      {
        name: "Welding Torch",
        desc: "We manufacture high quality PTA (Plasma Transferred Arc) welding Torches for all your hardfacing/cladding applications.",
        imgs: [
          "/servicemachines/machine accessories/4/acc4.1.jpg",
          "/servicemachines/machine accessories/4/acc4.2.jpg",
          "/servicemachines/machine accessories/4/acc4.3.jpg",
        ],
      },
      {
        name: "Cross Slides",
        desc: "We manufacture cross slide Units for Torch manipulation using LM rails and lead screw combinations.",
        imgs: ["/servicemachines/machine accessories/5/acc5.1.jpg"],
      },
    ],
  },
];

export default function Services() {
  const formRef = useRef<HTMLFormElement>(null);
  const detailSectionRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [activeCatId, setActiveCatId] = useState<string>(categories[0].id);
  const [activeProd, setActiveProd] = useState<Product>(categories[0].products[0]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  // URL Parameter Handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get("cat");
    const prodName = params.get("prod");

    if (catId) {
      const selectedCat = categories.find((c) => c.id === catId);
      if (selectedCat) {
        setActiveCatId(selectedCat.id);
        if (prodName) {
          const selectedProd = selectedCat.products.find(
            (p) => p.name.toLowerCase() === prodName.toLowerCase()
          );
          if (selectedProd) setActiveProd(selectedProd);
        } else {
          setActiveProd(selectedCat.products[0]);
        }
      }
    }
  }, []);

  const activeCategory = categories.find(c => c.id === activeCatId) || categories[0];

  const handleCatClick = (cat: Category) => {
    setActiveCatId(cat.id);
    // Automatically select the first product in the new category to keep details relevant
    setActiveProd(cat.products[0]);
    setActiveImgIndex(0);
  };

  const handleProdClick = (prod: Product) => {
    setActiveProd(prod);
    setActiveImgIndex(0);
    // Smooth scroll to the details section
    detailSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Full name is required (min 3 chars).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.details.trim() || formData.details.trim().length < 10) {
      newErrors.details = "Please provide more details (min 10 chars).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const templateParams = {
      user_name: formData.name.trim(),
      user_email: formData.email.trim(),
      user_phone: formData.phone.trim(),
      project_details: formData.details.trim(),
      product_interest: activeProd.name,
    };

    emailjs
      .send(
        "service_67r7kfg",
        "template_xwnafxs",
        templateParams,
        "9bJ_hqjsB63RMeUH0"
      )
      .then(() => {
        alert("Enquiry Sent Successfully!");
        setFormData({ name: "", email: "", phone: "", details: "" });
        setErrors({});
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send. Please try again later.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans pb-20 selection:bg-red-100">
      <div className="h-16 md:h-20 w-full bg-white border-b border-gray-100 shadow-sm"></div>

      <section className="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900"
          >
            Products & <span className="text-red-600">Services</span>
          </motion.h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our advanced industrial automation solutions designed for precision and durability.
          </p>
        </div>

        {/* 1. CATEGORY TABS (NEW LAYOUT) */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCatClick(cat)}
              className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base tracking-wide transition-all duration-300 ${
                activeCatId === cat.id
                  ? "bg-red-600 text-white shadow-lg shadow-red-200 scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* 2. PRODUCT GRID FOR SELECTED CATEGORY (NEW LAYOUT) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCatId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-20"
          >
            {activeCategory.products.map((prod, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                onClick={() => handleProdClick(prod)}
                className={`group cursor-pointer rounded-3xl p-6 flex flex-col items-center justify-between text-center transition-all duration-300 border-2 ${
                  activeProd.name === prod.name
                    ? "bg-white border-red-600 shadow-xl ring-4 ring-red-50"
                    : "bg-white border-transparent shadow-sm hover:shadow-xl hover:border-red-200"
                }`}
              >
                {/* Product Image inside Grid */}
                <div className="w-full h-40 md:h-48 bg-gray-50 rounded-2xl flex items-center justify-center p-4 mb-6 overflow-hidden relative">
                  <img
                    src={prod.imgs[0]}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                  {activeProd.name === prod.name && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full">
                      Viewing
                    </div>
                  )}
                </div>
                
                {/* Product Title inside Grid */}
                <h3 className={`font-black text-lg uppercase leading-tight tracking-wide ${activeProd.name === prod.name ? "text-red-600" : "text-gray-900 group-hover:text-red-500"}`}>
                  {prod.name}
                </h3>
                
                <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">
                  {prod.desc}
                </p>

                <div className="mt-6 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${activeProd.name === prod.name ? "w-full bg-red-600" : "w-0 group-hover:w-full bg-red-300"}`}></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 3. PRODUCT DETAILS (ENHANCED LAYOUT) */}
        <div ref={detailSectionRef} className="scroll-mt-24">
            <AnimatePresence mode="wait">
            <motion.div
                key={activeProd.name}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                
                {/* Image Gallery Side */}
                <div className="bg-gray-50 p-8 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                  <div className="bg-white rounded-[30px] p-8 shadow-sm flex items-center justify-center min-h-[300px] md:min-h-[450px] mb-8 relative">
                      <motion.img
                        key={activeImgIndex}
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        src={activeProd.imgs[activeImgIndex]}
                        alt={activeProd.name}
                        className="max-h-[350px] w-auto object-contain"
                      />
                  </div>
                  
                  {activeProd.imgs.length > 1 && (
                      <div className="flex gap-4 justify-center flex-wrap">
                      {activeProd.imgs.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImgIndex(idx)}
                            className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 p-2 transition-all bg-white overflow-hidden ${
                                activeImgIndex === idx ? "border-red-600 scale-110 shadow-lg" : "border-gray-200 opacity-70 hover:opacity-100 hover:border-red-300"
                            }`}
                          >
                            <img src={img} className="w-full h-full object-contain" alt="thumbnail" />
                          </button>
                      ))}
                      </div>
                  )}
                </div>

                {/* Content & Specs Side */}
                <div className="p-8 md:p-16 flex flex-col h-full bg-white">
                  <span className="inline-block text-red-600 font-black tracking-widest text-xs uppercase bg-red-50 px-4 py-2 rounded-full w-max mb-6">
                      Technical Specifications
                  </span>
                  
                  <h4 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                      {activeProd.name}
                  </h4>
                  
                  <div className="w-24 h-2 bg-red-600 rounded-full mb-8"></div>
                  
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
                      {activeProd.desc}
                  </p>
                  
                  {activeProd.features && (
                      <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100 mt-auto">
                        <h5 className="font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-3">
                            <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                            Key Capabilities
                        </h5>
                        <ul className="space-y-4">
                            {activeProd.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-700 md:text-lg">
                                <svg className="w-6 h-6 text-red-600 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="leading-relaxed">{feature}</span>
                            </li>
                            ))}
                        </ul>
                      </div>
                  )}
                </div>
              </div>
            </motion.div>
            </AnimatePresence>
        </div>

        {/* 4. VIDEO & ENQUIRY FORM */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Video Block */}
          <div className="rounded-[40px] overflow-hidden bg-black aspect-video lg:aspect-auto relative shadow-2xl min-h-[350px]">
            {activeProd.video ? (
              activeProd.video.includes("youtube.com") || activeProd.video.includes("youtu.be") ? (
                <iframe
                  key={activeProd.video}
                  className="w-full h-full border-0 absolute inset-0"
                  src={activeProd.video}
                  title={activeProd.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  key={activeProd.video}
                  className="w-full h-full object-cover absolute inset-0"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src={activeProd.video} type="video/mp4" />
                </video>
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-900 absolute inset-0">
                <div className="w-20 h-20 mb-6 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <p className="text-xl font-bold text-white mb-2">Video In Production</p>
                <p className="text-sm opacity-80 max-w-xs">High-definition technical footage for the {activeProd.name} will be available soon.</p>
              </div>
            )}
          </div>

          {/* Form Block */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                Request a Quote
              </h3>
              <p className="text-gray-500 mb-8 md:text-lg">
                Connect with our engineers regarding <strong className="text-red-600">{activeProd.name}</strong> specifications.
              </p>

              <form ref={formRef} className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-wider">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`w-full bg-gray-50 border-2 rounded-2xl p-4 focus:outline-none transition-all ${errors.name ? "border-red-500 bg-red-50/50" : "border-gray-100 focus:border-red-500 focus:bg-white"}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`w-full bg-gray-50 border-2 rounded-2xl p-4 focus:outline-none transition-all ${errors.email ? "border-red-500 bg-red-50/50" : "border-gray-100 focus:border-red-500 focus:bg-white"}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className={`w-full bg-gray-50 border-2 rounded-2xl p-4 focus:outline-none transition-all ${errors.phone ? "border-red-500 bg-red-50/50" : "border-gray-100 focus:border-red-500 focus:bg-white"}`}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1 mb-2 block tracking-wider">Project Requirements</label>
                  <textarea
                    name="details"
                    rows={4}
                    className={`w-full bg-gray-50 border-2 rounded-2xl p-4 focus:outline-none transition-all resize-none ${errors.details ? "border-red-500 bg-red-50/50" : "border-gray-100 focus:border-red-500 focus:bg-white"}`}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your industrial requirements..."
                  ></textarea>
                  {errors.details && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{errors.details}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-wider transition-all shadow-lg active:scale-[0.98] ${
                    isSending ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gray-900 text-white hover:bg-red-600 hover:shadow-red-200"
                  }`}
                >
                  {isSending ? "Processing Request..." : "Submit Technical Enquiry"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

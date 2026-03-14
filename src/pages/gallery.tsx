import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TYPESCRIPT INTERFACES ---
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

interface GalleryItem {
  url: string;
  name: string;
  category: string;
  productData: Product;
}

// --- DATA ---
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
        desc: "Plasma Transferred Arc (PTA) Welding is a highly advanced and precise welding process designed for hard-facing, cladding, and high-quality metal deposition. At Sharptrax Technologies, we specialize in PTA welding solutions that enhance the durability and performance of industrial components, reducing wear and tear in extreme working conditions.",
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
        desc: "At Sharptrax Technologies, our welding rotators are designed to enhance efficiency, precision, and safety in welding operations. These automated positioning systems help in rotating cylindrical workpieces, ensuring uniform welding and reduced manual effort.",
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
          "Versatile Application Range – Engineered to be suitable for a wide range of industrial welding jobs and workpiece types.",
          "Specialized Hydraulic Solutions – Specifically designed for high-precision welding of hydraulic cylinder components.",
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
    ],
  },
  {
    id: "welding-positioners",
    title: "Welding Positioners",
    products: [
      {
        name: "Welding Positioners",
        desc: "At Sharptrax Technologies, our welding positioners are designed to enhance efficiency, precision, and safety in welding operations. These advanced positioning systems allow welders to rotate and tilt workpieces into the optimal position, ensuring better accessibility, reduced strain, and improved weld quality.",
        features: [
          "Wide Load Capacity Range – Available in various weight load capacities ranging from 50 kg to 20 tons.",
          "Adjustable Center of Gravity – Engineered to accommodate a center of gravity from 75 mm to 300 mm.",
          "Versatile Loading Options – Designed to handle both eccentric and non-eccentric job loads with precision.",
          "Customizable Tilt Table – Features a tilt table design that can be fully customized to meet specific project requirements.",
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
        desc: "Sharptrax offers extensive range of L type Positioners for manipulating various types of components, Servo/VFD driven for positioning the arms. We also integrate/synchronize with third party Robot to accomplish complete welding process.",
        features: [
          "High Positioning Accuracy – Engineered for precision-driven operations with exceptional position accuracy.",
          "Dual-Axis Servo Control – Features two-axis control powered by high-performance servo drives and motors.",
          "Advanced PLC Integration – Includes a PLC control option for automated and reliable sequence management.",
          "Robotic Compatibility – Designed for seamless integration with industrial robots to enhance automation.",
          "Maximum Efficiency – Optimized to maximize both operational efficiency and welding accuracy.",
          "Superior Material Handling – Provides excellent material handling capabilities for various workpiece sizes.",
          "Full Rotational Range – Equipped with 360-degree rotation ability for unrestricted access and positioning.",
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
        desc: "Sharptrax offers very high quality Scissor Rollers, which can be used to hold your pipe as a support for your existing machines and can be used as standalone device for pipe support.",
        imgs: [
          "/servicemachines/welding positioners/3/pos3.1.jpg",
          "/servicemachines/welding positioners/3/pos3.2.jpg",
          "/servicemachines/welding positioners/3/pos3.3.jpg",
          "/servicemachines/welding positioners/3/pos3.4.jpg",
        ],
      },
      {
        name: "Welding Turn Table",
        desc: "We offer excellent quality range of Welding Positioners (Manipulators) that are made from quality raw material. Widely used in various industrial applications, our Positioners position you for maximum flexibility and efficiency. This can also be integrated with Robotic welding automation.",
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
        desc: "At Sharptrax Technologies, we specialize in trading high-quality Plasma CNC Cutting Machines designed for precision cutting, high-speed performance, and superior efficiency. Our Plasma CNC machines are ideal for industries requiring accurate metal cutting solutions with advanced automation.",
        features: [
          "High-Precision Cutting – Delivers smooth, clean, and accurate cuts across various metal thicknesses with minimal material wastage.",
          "CNC-Controlled Automation – Ensures highly efficient and repeatable cutting processes through advanced, user-friendly programming interfaces.",
          "Heavy-Duty Build – Constructed with a robust frame to handle high-speed industrial operations while maintaining long-term stability.",
          "Clean Edge Finish – Optimized plasma technology reduces dross and secondary finishing requirements, saving operational time.",
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
        desc: "At Sharptrax Technologies, our Torch Weaving Unit, also known as the Welding Weaving Unit, is designed to enhance welding precision and efficiency by introducing a controlled weaving motion to the welding torch. This advanced system ensures uniform bead formation, improved penetration, and better fusion, making it ideal for critical and high-strength welding applications.",
        features: [
          "High Precision Torch Weaving – Specifically engineered for PTAW, TIG, MIG, and SAW applications with superior accuracy.",
          "Advanced Linear Motion – Achieved through standard LM bush/linear bearings combined with ball screw transmission for maximum durability.",
          "Precise Width Control – Offers a 0 – 40 mm weaving width precisely managed via micro-controller or PLC integration.",
          "Industrial Grade Reliability – Built for high-performance welding environments requiring consistent and repeatable motion.",
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
        desc: "At Sharptrax Technologies, we manufacture Automatic Voltage Controller (AVC) unit for TIG and Plasma welding process. AVC units are built with LM guideway slides and Servo Motors for precise control height adjustments. AVC units are being used for moving the welding torch vertically, in order to maintain gap between the torch and the job irrespective of its ovality.",
        imgs: [
          "/servicemachines/machine accessories/2/acc2.1.jpg",
          "/servicemachines/machine accessories/2/acc2.2.jpg",
        ],
      },
      {
        name: "Laser Seam Tracking Unit",
        desc: "At Sharptrax Technologies, our Laser Seam Tracking Unit enables tracking of almost all weld joints to avoid manual intervention. It is independently developed, convenient to operate and easy to teach. It features premium optical components compatible with all major robot brands. The unit includes seam finding and tracking functions, a host control unit with an accurate algorithm, and an internal airway design.",
        features: [
          "Automatic Real-Time Detection – Enhances welding precision by automatically detecting and adjusting to seam variations during operation.",
          "Consistent Weld Quality – Engineered to maintain high-quality, repeatable weld beads by compensating for real-time changes.",
          "Error Reduction – Significantly reduces defects and manual rework through advanced automated tracking sensors.",
          "High Process Efficiency – Improves the overall speed and reliability of automated welding workflows.",
          "Precision Laser Guidance – Utilizes high-precision laser technology to ensure the torch follows the exact seam path.",
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
        desc: "At Sharptrax Technologies, we manufacture high quality PTA (Plasma Transferred Arc) welding Torches for all your hardfacing/cladding applications, we also build customised water cooled PTA OD and ID Torches for high deposition stellite, colmonoy and various alloy powder overlaying.",
        imgs: [
          "/servicemachines/machine accessories/4/acc4.1.jpg",
          "/servicemachines/machine accessories/4/acc4.2.jpg",
          "/servicemachines/machine accessories/4/acc4.3.jpg",
        ],
      },
      {
        name: "Cross Slides",
        desc: "At Sharptrax Technologies, we manufacture cross slide Units for Torch manipulation, LM rails and lead screw combination makes the transmission so smooth, Different payloads and various stroke length slides are being made for several applications.",
        imgs: ["/servicemachines/machine accessories/5/acc5.1.jpg"],
      },
    ],
  },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Stop background scrolling when the popup is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  // Flatten the array to easily map all images
  const allGalleryItems: GalleryItem[] = categories.flatMap((category) =>
    category.products.flatMap((product) =>
      product.imgs.map((imgUrl) => ({
        url: imgUrl,
        name: product.name,
        category: category.title,
        productData: product, 
      }))
    )
  );

  return (
    <div className="w-full min-h-screen bg-white pb-20 relative">
      {/* Spacer for Navbar */}
      <div className="h-20 md:h-32"></div>

      {/* Header Section */}
      <div className="w-full px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
          GALLERY
        </h1>
        <div className="w-24 h-2 bg-red-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto uppercase tracking-widest font-medium">
          Showcasing our high-precision welding automation & industrial
          solutions
        </p>
      </div>

      {/* Full-Width Grid Container */}
      <div className="w-full px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {allGalleryItems.map((item, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedItem(item)} 
            >
              {/* Responsive Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-red-500/20">
                <img
                  src={item.url}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-semibold tracking-widest text-sm bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    VIEW DETAILS
                  </span>
                </div>
              </div>

              {/* Text Label Section */}
              <div className="mt-5 text-center px-2">
                <h3 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-tighter leading-tight transition-colors duration-300 group-hover:text-red-600">
                  {item.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="h-px w-3 bg-gray-300 group-hover:bg-red-500 transition-colors"></span>
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                  <span className="h-px w-3 bg-gray-300 group-hover:bg-red-500 transition-colors"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL / POPUP OVERLAY */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // --- FIX IS HERE: Added heavy padding (p-6 md:p-12) to force the modal away from screen edges ---
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 md:p-12"
            onClick={() => setSelectedItem(null)} // Close when clicking outside
          >
            {/* Modal Content Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              // --- FIX IS HERE: Used max-h-full so it takes 100% of the padded safe area, not the raw screen area ---
              className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-full"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the box
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 bg-white hover:bg-red-500 hover:text-white text-gray-800 shadow-md border border-gray-100 rounded-full flex items-center justify-center z-50 transition-all text-xl font-bold"
              >
                ×
              </button>

              {/* LEFT SIDE: Image Container */}
              <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center relative min-h-[250px] md:min-h-0 flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-200">
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.name} 
                  className="absolute inset-0 w-full h-full object-contain p-4" 
                />
              </div>

              {/* RIGHT SIDE: Machine Details */}
              <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                <span className="text-red-600 font-bold tracking-widest text-xs uppercase mb-2 block">
                  {selectedItem.category}
                </span>
                
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight pr-8">
                  {selectedItem.productData.name}
                </h2>
                
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  {selectedItem.productData.desc}
                </p>

                {/* Features (if they exist) */}
                {selectedItem.productData.features && (
                  <div className="mb-8">
                    <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedItem.productData.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-700 items-start">
                          <span className="text-red-500 font-bold mt-0.5">✔</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Video section (if it exists) */}
                {selectedItem.productData.video && (
                  <div className="mt-8 pb-4">
                    <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-xs border-b pb-2">
                      Machine Overview Video
                    </h4>
                    {/* Check if the video is a YouTube embed link or a local .mp4 file */}
                    {selectedItem.productData.video.includes("youtube.com") ? (
                      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md">
                        <iframe
                          className="w-full h-full"
                          src={selectedItem.productData.video}
                          title={selectedItem.productData.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md bg-black">
                        <video
                          controls
                          className="w-full h-full object-cover"
                          src={selectedItem.productData.video}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
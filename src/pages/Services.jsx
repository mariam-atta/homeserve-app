import { Link } from "react-router-dom";
import { useState } from "react";
import cleaningImg from "../assets/Home-Clean.png";
import plumbingImg from "../assets/Home-Plumbing.png";
import electricianImg from "../assets/Home-electrician.png";
import acRepairImg from "../assets/Home-AcRepair.png";
import paintingImg from "../assets/Home-Painting.png";
import carpentryImg from "../assets/Home-Carpentry.png";
import applianceRepairImg from "../assets/Home-ApplianceRepair.png";
import pestControlImg from "../assets/Home-pestControl.png";
import {
  SparklesIcon,
  WrenchIcon,
  BoltIcon,
  CloudIcon,
  PaintBrushIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";

export const services = [
  {
    id: "cleaning",
    icon: SparklesIcon,
    image: cleaningImg,
    name: "Cleaning",
    desc: "Professional home cleaning services",
    rating: 4.7,
    reviews: 95,
    price: 20,
    description:
      "We provide expert home cleaning services for all room types. Our professionals ensure a spotless, healthy living space.",
    features: ["Deep Cleaning", "Kitchen & Bathroom", "Floor Care", "Eco-friendly Products"],
  },
  {
    id: "plumbing",
    icon: WrenchIcon,
    image: plumbingImg,
    name: "Plumbing",
    desc: "Expert plumbing solutions",
    rating: 4.6,
    reviews: 110,
    price: 30,
    description:
      "We provide expert plumbing repair and installation services for all fixtures. Our professionals handle leaks, clogs, and installs efficiently.",
    features: ["Leak Repair", "Pipe Installation", "Drain Cleaning", "Fixture Setup"],
  },
  {
    id: "electrician",
    icon: BoltIcon,
    image: electricianImg,
    name: "Electrician",
    desc: "Safe and reliable electrical work",
    rating: 4.8,
    reviews: 140,
    price: 28,
    description:
      "We provide safe and reliable electrical services for homes of all sizes. Our professionals handle wiring, repairs, and installations.",
    features: ["Wiring Repair", "Fixture Installation", "Safety Inspection", "Panel Upgrades"],
  },
  {
    id: "ac-repair",
    	icon: CloudIcon,
    name: "AC Repair",
    image: acRepairImg,
    desc: "AC installation & repair services",
    rating: 4.8,
    reviews: 120,
    price: 25,
    description:
      "We provide expert AC repair and maintenance services for all brands. Our professionals ensure your AC works efficiently.",
    features: ["AC Installation", "AC Repair", "AC Maintenance", "Gas Refilling", "AC Cleaning"],
  },
  {
    id: "painting",
    icon: PaintBrushIcon,
    image: paintingImg, 
    name: "Painting",
    desc: "Professional home painting",
    rating: 4.5,
    reviews: 80,
    price: 22,
    description:
      "We provide professional interior and exterior painting services. Our professionals ensure a clean, even finish every time.",
    features: ["Interior Painting", "Exterior Painting", "Wall Prep", "Color Consultation"],
  },
  {
    id: "carpentry",
    icon: WrenchScrewdriverIcon,
    image: carpentryImg,
    name: "Carpentry",
    desc: "Custom furniture & woodwork",
    rating: 4.6,
    reviews: 65,
    price: 26,
    description:
      "We provide custom carpentry and woodwork services for your home. Our professionals build and repair furniture with precision.",
    features: ["Custom Furniture", "Repairs", "Cabinetry", "Woodwork"],
  },
  {
    id: "appliance-repair",
    icon: Cog6ToothIcon,
    image: applianceRepairImg,
    name: "Appliance Repair",
    desc: "Washing machine, fridge, and more",
    rating: 4.7,
    reviews: 100,
    price: 24,
    description:
      "We provide expert appliance repair services for washing machines, fridges, and more. Our professionals diagnose and fix issues fast.",
    features: ["Washing Machine", "Refrigerator", "Microwave", "Dishwasher"],
  },
  {
    id: "pest-control",
    icon: BugAntIcon,
    image: pestControlImg,
    name: "Pest Control",
    desc: "Safe and effective pest control",
    rating: 4.6,
    reviews: 90,
    price: 32,
    description:
      "We provide safe and effective pest control services for your home. Our professionals eliminate pests while keeping your family safe.",
    features: ["Insect Control", "Rodent Control", "Termite Treatment", "Preventive Care"],
  },
];

const categories = ["All Services", ...services.map((s) => s.name)];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All Services"); 
  function handleCategoryClick(category) {
    setActiveCategory(category); 
  }

  const filteredServices =
    activeCategory === "All Services"
      ? services
      : services.filter((service) => service.name === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> / Services
      </p>

      <h1 className="text-3xl font-bold text-gray-900">Our Services</h1>
      <p className="text-gray-600 mt-2 max-w-lg">
        We provide a wide range of home services to make your life easier.
      </p>

      <div className="grid md:grid-cols-4 gap-8 mt-10">
        {/* Category sidebar */}
        <aside className="border border-gray-200 rounded-xl p-4 h-fit">
          <p className="font-semibold text-sm text-gray-900 mb-3">Categories</p>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className={`text-left w-full px-2 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Service cards */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition block"
            >
              <service.icon className="w-8 h-8 text-green-700 mb-3" />
              <p className="font-semibold text-gray-900">{service.name}</p>
              <p className="text-gray-500 text-sm mt-1">{service.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
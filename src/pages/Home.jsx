import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { services } from "./Services";
import heroWorker from "../assets/hero-worker.png";
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";


const steps = [
  { icon: ClipboardDocumentListIcon, number: "1", title: "Choose Service", desc: "Select the service you need" },
  { icon: CalendarDaysIcon, number: "2", title: "Book Online", desc: "Pick a time slot and place your booking" },
  { icon: CheckBadgeIcon, number: "3", title: "Get It Done", desc: "Our professional arrives on time" },
  { icon: StarIcon, number: "4", title: "Pay & Review", desc: "Pay securely and rate our service" },
];

const trustBadges = [
  { title: "Verified Professionals", desc: "Background checked experts" },
  { title: "On-time Service", desc: "Punctual and reliable" },
  { title: "Transparent Pricing", desc: "No hidden charges" },
  { title: "Satisfaction Guaranteed", desc: "We ensure quality service" },
];

export default function Home() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState(""); 
  const navigate = useNavigate();
  const routeLocation = useLocation();
  useEffect(() => {
  if (routeLocation.hash) {
    const el = document.querySelector(routeLocation.hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [routeLocation]);

  function handleService(){
    const selectedService = services.find((item)=> item.name.toLowerCase() === service.toLowerCase());

      if(selectedService){
        navigate(`/services/${selectedService.id}`)
      }
      else
        navigate("/services");
    
  }

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Professional Home Services at Your{" "}
            <span className="text-green-700">Doorstep</span>
          </h1>

          <p className="text-gray-600 mt-4 max-w-md">
            Book trusted professionals for all your home needs. Fast,
            reliable and affordable services.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="text"
              placeholder="What service do you need?"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-600"
          
              value= {service} onChange={ (e) =>  setService(e.target.value)}/>
            <input
              type="text"
              placeholder="Enter your location"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-600"
              value= {location} onChange={ (e) =>  setLocation(e.target.value)} 
            />
            <button
              className="bg-green-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-800 whitespace-nowrap"
              onClick={handleService}
            >
              Search
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            <span className="font-medium text-gray-700">Popular Services:</span>{" "}
            Cleaning, Plumbing, Electrician, AC Repair
          </p>
        </div>

        {/* Hero image placeholder — swap this div for a real <img> later */}
        <img src={heroWorker}
        alt="HomeServe professional ready to help"
        className="rounded-2xl w-full h-auto object-contain"/>
      </section>

      {/* ================= TRUST BADGES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6">
        {trustBadges.map((badge) => (
          <div key={badge.title}>
            <p className="font-semibold text-gray-900 text-sm">{badge.title}</p>
            <p className="text-gray-500 text-sm mt-1">{badge.desc}</p>
          </div>
        ))}
      </section>

      {/* ================= POPULAR SERVICES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Our Popular Services</h2>
          <button
  onClick={() => navigate("/services")}
  className="text-sm font-medium border border-gray-300 bg-gray-50 rounded-lg px-4 py-2 hover:bg-gray-50"
>
  View All Services
</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service) => (
            <Link
            key={service.id}
            to={`/services/${service.id}`}
            className="border border-gray-200 bg-gray-50 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              
             <service.icon className="w-8 h-8 text-green-700 mb-3" />
             <p className="font-semibold text-gray-900">{service.name}</p>
             <p className="text-gray-500 text-sm mt-1">{service.desc}</p>
            </Link>
          ))} 
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-10">How It Works</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="text-center relative">
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-green-700 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-green-700" /></div>
              <p className="font-semibold text-gray-900 mt-4">
                {step.number}. {step.title}
              </p>
              <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
import { Link, useParams } from "react-router-dom";
import { services } from "./Services";
import {
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const howItWorks = [
  { icon: ClipboardDocumentListIcon, label: "Choose Service" },
  { icon: CalendarDaysIcon, label: "Book Online" },
  { icon: CheckBadgeIcon, label: "Get It Done" },
  { icon: StarIcon, label: "Pay & Review" },
];

export default function ServiceDetails() {
  const { serviceId } = useParams();

  const serviceFound = services.find((service) => service.id === serviceId);

  if (!serviceFound) {
    return (
      <p>
        Service not found. <Link to="/services">Back to Services</Link>
      </p>
    );
  }

  const service = serviceFound;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> /{" "}
        <Link to="/services" className="hover:text-green-700">Services</Link> /{" "}
        {service.name}
      </p>

      <div className="grid md:grid-cols-2 gap-12">
  
        {/* Image or icon placeholder */}
        <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center overflow-hidden">
          {service.image ? (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <service.icon className="w-32 h-32 text-green-700" />
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            ⭐ {service.rating} ({service.reviews} reviews)
          </p>

          <p className="text-gray-600 mt-4">{service.description}</p>

          <ul className="mt-6 space-y-2">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircleIcon className="w-5 h-5 text-green-700" /> {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <div>
              <p className="text-xs text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-gray-900">${service.price}</p>
            </div>
            <Link
              to={`/booking?service=${service.id}`}
              className="bg-green-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-800"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works mini section */}
      <div className="mt-16 border-t border-gray-100 pt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => (
            <div key={step.label} className="text-center">
              <div className="w-14 h-14 mx-auto rounded-full border-2 border-green-700 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-green-700" />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-3">
                {i + 1}. {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
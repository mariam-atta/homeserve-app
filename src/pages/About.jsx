import { Link } from "react-router-dom";
import aboutUsImg from "../assets/Home-AboutUs.png";


const highlights = [
  "Trusted Professionals",
  "Quality Service",
  "Affordable Pricing",
  "Customer Satisfaction",
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> / About Us
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About HomeServe</h1>
          <p className="text-gray-600 mt-4">
            We are committed to providing reliable and professional home
            services.
          </p>
          <p className="text-gray-600 mt-3">
            Our mission is to connect customers with trusted professionals
            and deliver satisfaction with every service.
          </p>

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700 text-sm">
                <span className="text-green-700">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Image placeholder */}
        {/* Image */}
        {/* Image */}
<div className="rounded-2xl overflow-hidden">
  <img
    src={aboutUsImg}
    alt="HomeServe team of professionals"
    className="w-full h-auto object-contain"
  />
</div>
      </div>
    </div>
  );
}
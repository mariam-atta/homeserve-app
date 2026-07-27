import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-900 mb-2">HomeServe</p>
          <p>Trusted professionals for all your home service needs.</p>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2">Company</p>
          <ul className="space-y-1">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2">Support</p>
          <ul className="space-y-1">
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/help">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-2">Get in touch</p>
          <p>support@homeserve.com</p>
          <p>+1 234 567 8900</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 py-4 border-t border-gray-100">
        © {new Date().getFullYear()} HomeServe. All rights reserved.
      </div>
    </footer>
  );
}

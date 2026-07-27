import { Link } from "react-router-dom";

export default function MessageSent() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mt-6">Message Sent!</h1>
      <p className="text-gray-500 mt-2">
        Thanks for reaching out. Our team will get back to you shortly.
      </p>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Link
          to="/"
          className="bg-green-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
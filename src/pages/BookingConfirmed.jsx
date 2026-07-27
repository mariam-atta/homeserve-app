import { Link } from "react-router-dom";

export default function BookingConfirmed() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl">
        ✓
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mt-6">Booking Confirmed!</h1>
      <p className="text-gray-500 mt-2">
        Your service has been booked successfully. We'll be in touch shortly
        to confirm the details.
      </p>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Link
          to="/dashboard"
          className="bg-green-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-800"
        >
          View My Bookings
        </Link>
        <Link
          to="/"
          className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
import { Link, useSearchParams } from "react-router-dom";
import { services } from "./Services";
import { useState } from "react";
import { useBookings } from "../context/BookingsContext";
import { useNavigate } from "react-router-dom";

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "02:00 PM", "3:00 PM", "04:00 PM"];
const paymentMethods = ["Cash", "Card"];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [dropdownChoice, setDropdownChoice] = useState("");
  const { addBooking } = useBookings();
  const navigate = useNavigate();

  const serviceQuery = searchParams.get("service");
  const matchedService = services.find((item) => item.id === serviceQuery);

  const cameFromServicePage = Boolean(matchedService);
  const effectiveService = matchedService ?? services.find((item) => item.id === dropdownChoice);

  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
    date: "",
    time: "",
    paymentMethod: "", 
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  function validateBooking() {
    if (!effectiveService) {
      return "Please select a service first.";
    }

    const requiredFields = ["fullName", "phone", "email", "address", "date", "time", "paymentMethod"]; // ✅ added
    const hasEmptyField = requiredFields.some((field) => user[field].trim() === "");
    if (hasEmptyField) {
      return "Please fill in all required fields.";
    }

    const isValidEmail = user.email.includes("@") && user.email.includes(".");
    if (!isValidEmail) {
      return "Please enter a valid Email address.";
    }

    return null;
  }

  function handleSubmit() {
  const error = validateBooking();
  if (error) {
    alert(error);
    return;
  }

  const bookingDraft = {
    serviceName: effectiveService.name,
    ...user,
  };

  if (user.paymentMethod === "Card") {
    navigate("/payment-details", { state: { bookingDraft } });
  } else {
    addBooking(bookingDraft);
    navigate("/booking-confirmed");
  }
}

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-2">
        <Link to="/" className="hover:text-green-700">Home</Link> / Booking
      </p>
      <h1 className="text-2xl font-bold text-gray-900">Book Your Service</h1>
      <p className="text-gray-500 text-sm mt-1">Fill in the details to book a service</p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {/* Left: service selection/summary + date/time */}
        <div className="space-y-6">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 mb-3">Service Details</p>

            {cameFromServicePage ? (
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  <effectiveService.icon className="w-8 h-8 text-green-700" /></div>
                <div>
                  <p className="font-semibold text-gray-900">{effectiveService.name}</p>
                  <p className="text-sm text-gray-500">Starting from ${effectiveService.price}</p>
                </div>
              </div>
            ) : (
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={dropdownChoice}
                onChange={(e) => setDropdownChoice(e.target.value)}
              >
                <option value="">Select a service...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 mb-3">Select Date & Time</p>
            <div className="flex flex-col gap-3">
              <input
                type="date"
                name="date"
                value={user.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <select
                name="time"
                value={user.time}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select a time...</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ✅ New payment method card */}
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 mb-3">Payment Method</p>
            <select
              name="paymentMethod"
              value={user.paymentMethod}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select a payment method...</option>
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              Payment is collected after the service is completed.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 mb-3">Your Details</p>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
                value={user.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone Number</label>
              <input
                name="phone"
                type="text"
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Address</label>
              <input
                name="address"
                type="text"
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
                value={user.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Additional Notes (Optional)</label>
              <textarea
                name="notes"
                placeholder="Any specific instructions?"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
                value={user.notes}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full bg-green-700 text-white font-medium py-3 rounded-lg hover:bg-green-800 mt-2"
              onClick={handleSubmit}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
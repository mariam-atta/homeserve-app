import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useBookings } from "../context/BookingsContext";

export default function CardDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking } = useBookings();

  const bookingDraft = location.state?.bookingDraft;

  const [card, setCard] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });


  if (!bookingDraft) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <p className="text-gray-600">
          No booking in progress.{" "}
          <Link to="/booking" className="text-green-700 font-medium">
            Start a new booking
          </Link>
          .
        </p>
      </div>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value });
  }

  function validateCard() {
    const requiredFields = ["nameOnCard", "cardNumber", "expiry", "cvv"];
    const hasEmptyField = requiredFields.some((field) => card[field].trim() === "");
    if (hasEmptyField) {
      return "Please fill in all card fields.";
    }

    const digitsOnly = card.cardNumber.replace(/\s/g, "");
    if (!/^\d{16}$/.test(digitsOnly)) {
      return "Card number must be 16 digits.";
    }

    if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      return "Expiry must be in MM/YY format.";
    }

    if (!/^\d{3,4}$/.test(card.cvv)) {
      return "CVV must be 3 or 4 digits.";
    }

    return null;
  }

  function handlePay() {
    const error = validateCard();
    if (error) {
      alert(error);
      return;
    }

    const last4 = card.cardNumber.replace(/\s/g, "").slice(-4);

    // ✅ Only the last 4 digits get saved — the full number/CVV are never
    // stored, since this is a mock flow with no real payment processor.
    addBooking({
      ...bookingDraft,
      cardLast4: last4,
    });

    navigate("/booking-confirmed");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/booking" className="hover:text-green-700">Booking</Link> / Card Details
      </p>

      <h1 className="text-2xl font-bold text-gray-900">Enter Card Details</h1>
      <p className="text-gray-500 text-sm mt-1">
        This is a demo checkout — no real payment is processed.
      </p>

      <div className="border border-gray-200 rounded-xl p-6 mt-6 space-y-4">
        <div>
          <label className="text-xs text-gray-500">Name on Card</label>
          <input
            name="nameOnCard"
            type="text"
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
            value={card.nameOnCard}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-xs text-gray-500">Card Number</label>
          <input
            name="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
            value={card.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500">Expiry (MM/YY)</label>
            <input
              name="expiry"
              type="text"
              placeholder="08/27"
              maxLength={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={card.expiry}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500">CVV</label>
            <input
              name="cvv"
              type="text"
              placeholder="123"
              maxLength={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={card.cvv}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-green-700 text-white font-medium py-3 rounded-lg hover:bg-green-800"
        >
          Pay & Confirm Booking
        </button>
      </div>
    </div>
  );
}
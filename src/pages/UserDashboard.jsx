import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookings } from "../context/BookingsContext";

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Confirmed: "bg-green-50 text-green-700",
  Completed: "bg-blue-50 text-blue-700",
  Due: "bg-red-50 text-red-700",
};

const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "02:00 PM", "3:00 PM", "04:00 PM"];

export default function UserDashboard() {
  const { bookings, removeBooking, updateBooking } = useBookings();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ date: "", time: "" });

  const completedCount = bookings.filter((b) => b.status === "Completed").length;
  const pendingCount = bookings.filter((b) => b.status === "Pending").length;

  function handleCancel(id) {
    if (window.confirm("Cancel this booking? This can't be undone.")) {
      removeBooking(id);
    }
  }

  function startReschedule(booking) {
    setEditingId(booking.id);
    setDraft({ date: booking.date || "", time: booking.time || "" });
  }

  function saveReschedule(id) {
    if (!draft.date || !draft.time) {
      alert("Please select both a date and a time.");
      return;
    }
    updateBooking(id, { date: draft.date, time: draft.time });
    setEditingId(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
      <p className="text-gray-500 text-sm mt-1">Here's what's happening with your bookings</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{bookings.length}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{completedCount}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</p>
        </div>
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Upcoming</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
          <Link
            to="/booking"
            className="bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Book a new service
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm">
            No bookings yet.{" "}
            <Link to="/services" className="text-green-700 font-medium">
              Browse services
            </Link>{" "}
            to get started.
          </div>
        ) : (
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
            {bookings.map((booking) => {
              const isEditing = editingId === booking.id;
              const isLocked = booking.status === "Completed";

              return (
                <div key={booking.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{booking.serviceName}</p>
                      <p className="text-sm text-gray-500">
                        {booking.date || "No date"} · {booking.time || "No time"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {booking.paymentMethod === "Card"
                          ? `Paid with card •••• ${booking.cardLast4 || "----"}`
                          : booking.paymentMethod
                          ? `Payment: ${booking.paymentMethod}`
                          : "No payment method on file"}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          statusStyles[booking.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {booking.status}
                      </span>

                      {!isLocked && (
                        <>
                          <button
                            onClick={() => startReschedule(booking)}
                            className="text-xs font-medium text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5 hover:bg-gray-50"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancel(booking.id)}
                            className="text-xs font-medium text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3">
                      <input
                        type="date"
                        value={draft.date}
                        onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      />
                      <select
                        value={draft.time}
                        onChange={(e) => setDraft({ ...draft, time: e.target.value })}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="">Select a time...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => saveReschedule(booking.id)}
                        className="bg-green-700 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-green-800"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs font-medium text-gray-600 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
                      >
                        Cancel edit
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
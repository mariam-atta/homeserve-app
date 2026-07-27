import { useBookings } from "../context/BookingsContext";

const statusOptions = ["Pending", "Confirmed", "Completed", "Due"];

export default function AdminPanel() {
  const { bookings, updateBooking, removeBooking } = useBookings();

  function handleStatusChange(id, newStatus) {
    updateBooking(id, { status: newStatus });
  }

  function handleRemove(id) {
    if (window.confirm("Remove this booking?")) {
      removeBooking(id);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      <p className="text-gray-500 text-sm mt-1">
        Manage all bookings across the platform
      </p>

      {bookings.length === 0 ? (
        <div className="border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm mt-8">
          No bookings yet.
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl overflow-hidden mt-8">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Date & Time</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {booking.serviceName}
                  </td>
                  <td className="px-4 py-3">{booking.fullName}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {booking.phone}
                    <br />
                    {booking.email}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {booking.date || "—"} · {booking.time || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {booking.paymentMethod === "Card"
                      ? `Card •••• ${booking.cardLast4 || "----"}`
                      : booking.paymentMethod || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-red-600 text-xs font-medium hover:underline"
                      onClick={() => handleRemove(booking.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
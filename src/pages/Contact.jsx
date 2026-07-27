import { useState } from "react";
import { Link } from "react-router-dom";
import MessageSent from "./MessageSent";

const contactInfo = [
  { icon: "📞", label: "Phone", value: "+1 234 567 8900" },
  { icon: "✉️", label: "Email", value: "support@homeserve.com" },
  { icon: "📍", label: "Address", value: "123 Service St, Country" },
  { icon: "🕒", label: "Working Hours", value: "Mon - Sat: 9:00 AM - 6:00 PM" },
];

export default function Contact() {
  const [user, setUser] = useState({
    fullName: "", email:"",phone: "", message: "" 
  })
  
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e){
    const {name, value}= e.target;
      setUser({
        ...user,
        [name]: value,});
    }
  

  function validateContact() {

  const requiredFields = ["fullName", "phone", "email", "message"];
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
    const error = validateContact();
    if (error) {
      alert(error);
      return;
    }
    setSubmitted(true); // ✅ no navigate() needed anymore, just swap the view
  }

  if (submitted) {
    return <MessageSent />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> / Contact
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: contact info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-3 max-w-sm">
            We're here to help! Reach out to us for any queries or
            assistance.
          </p>

          <div className="mt-8 space-y-5">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="text-xs text-gray-500">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={user.fullName} onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={user.email} onChange={handleChange} 
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={user.phone} onChange={handleChange} 
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Message</label>
            <textarea
              name="message"
              placeholder="How can we help you?"
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1"
              value={user.message} onChange={handleChange}
            />
          </div>

          <button
            className="w-full bg-green-700 text-white font-medium py-3 rounded-lg hover:bg-green-800"
            onClick={handleSubmit}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
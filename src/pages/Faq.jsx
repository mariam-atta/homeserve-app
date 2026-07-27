import { useState } from "react";
import { Link } from "react-router-dom";
import { faqs } from "../data/faq";

export default function Faq() {
  const [openIndex, setOpenIndex]= useState(null);

  function toggle(index){
    if (openIndex===index){
      setOpenIndex(null)
    }else{
      setOpenIndex(index)
    }
  }
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> / FAQ
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2">
            Find answers to common questions.
          </p>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="border border-gray-200 rounded-xl px-4 py-3"
              >
                <button
                  className="w-full flex items-center justify-between text-left font-medium text-gray-900"
                  onClick={()=>toggle(index)}
                >
                  {faq.question}
                  <span className="text-gray-400">
                    {openIndex===index?'-':'+'}
                  </span>
                </button>

                {openIndex === index && (
                  <p className="text-gray-600 text-sm mt-3">{faq.answer}</p>)}
              </div>
            ))}
          </div>
        </div>

        {/* Side contact card */}
        <div className="bg-green-700 text-white rounded-2xl p-6 h-fit">
          <p className="font-semibold text-lg">Still have questions?</p>
          <p className="text-green-100 text-sm mt-2">
            We're here to help!
          </p>
          <Link
            to="/contact"
            className="inline-block mt-4 bg-white text-green-700 text-sm font-medium px-4 py-2 rounded-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
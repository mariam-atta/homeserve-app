import { useState } from "react";
import { Link } from "react-router-dom";
import { helpTopics } from "../data/helpTopics";


export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleTopic(index) {
    setOpenIndex(openIndex === index ? null : index); 
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600 mt-3">
          Find answers to common questions, or reach out if you need more help.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-12">
        {helpTopics.map((topic, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={topic.title}
              onClick={() => toggleTopic(index)}
              className={`border rounded-xl p-6 cursor-pointer transition-colors ${
                isOpen ? "border-green-700" : "border-gray-200 hover:border-green-700"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl">{topic.icon}</span>
                <span className="text-gray-400 text-lg">{isOpen ? "−" : "+"}</span>
              </div>
              <p className="font-semibold text-gray-900 mt-3">{topic.title}</p>
              <p className="text-sm text-gray-600 mt-1">{topic.description}</p>

              {isOpen && (
                <p className="text-sm text-gray-700 mt-4 pt-4 border-t border-gray-100">
                  {topic.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-14 border-t border-gray-100 pt-10">
        <p className="text-gray-600">Still have questions?</p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <Link
            to="/faq"
            className="border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            Browse FAQ
          </Link>
          <Link
            to="/contact"
            className="bg-green-700 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-800"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

const posts = [
  {
    id: "clean-healthy-home",
    icon: "🧹",
    title: "10 Tips for a Clean and Healthy Home",
    excerpt: "Simple habits that keep your home spotless and healthy.",
    date: "May 10, 2026",
  },
  {
    id: "maintain-ac",
    icon: "❄️",
    title: "How to Maintain Your AC for Better Cooling",
    excerpt: "Practical maintenance tips to extend your AC's lifespan.",
    date: "May 5, 2026",
  },
  {
    id: "plumbing-problems",
    icon: "🔧",
    title: "Common Plumbing Problems and Solutions",
    excerpt: "Quick fixes for the most common household plumbing issues.",
    date: "May 3, 2026",
  },
];

export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <p className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-green-700">Home</Link> / Blog
      </p>

      <h1 className="text-3xl font-bold text-gray-900">Our Latest Blog</h1>
      <p className="text-gray-600 mt-2 max-w-lg">
        Tips, advice, and updates for your home and lifestyle.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <div className="bg-gray-100 h-40 flex items-center justify-center text-5xl">
              {post.icon}
            </div>
            <div className="p-4">
              <p className="font-semibold text-gray-900">{post.title}</p>
              <p className="text-gray-500 text-sm mt-1">{post.excerpt}</p>
              <p className="text-gray-400 text-xs mt-3">{post.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
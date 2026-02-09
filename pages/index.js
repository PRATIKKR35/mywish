import Link from "next/link";

const categories = [
  { name: "Birthday", type: "birthday" },
  { name: "Festival", type: "festival" },
  { name: "Love", type: "love" },
  { name: "Wedding", type: "wedding" }
];

export default function Home() {
  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Create Beautiful Greetings 🎉
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map(c => (
          <Link key={c.type} href={`/category/${c.type}`}>
            <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-center hover:scale-105 transition cursor-pointer">
              {c.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { useRouter } from "next/router";

const templates = [
  { id: "gold", title: "Gold Celebration" },
  { id: "neon", title: "Neon Party" }
];

export default function Category() {
  const { type } = useRouter().query;

  return (
    <div className="p-10 text-white">
      <h2 className="text-3xl mb-6 capitalize">{type} Greetings</h2>

      <div className="grid grid-cols-2 gap-6">
        {templates.map(t => (
          <Link key={t.id} href={`/create/${t.id}`}>
            <div className="bg-white/20 p-6 rounded-xl hover:scale-105 transition cursor-pointer">
              {t.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

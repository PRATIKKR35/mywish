import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function View() {
  const { id } = useRouter().query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/greetings?id=${id}`)
        .then(res => res.json())
        .then(setData);
    }
  }, [id]);

  if (!data) return null;

  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      <div className="bg-white/20 p-10 rounded-xl text-center">
        <h1 className="text-4xl">🎉 Hello {data.name} 🎉</h1>
        <p className="mt-4 text-xl">{data.message}</p>
      </div>
    </div>
  );
}

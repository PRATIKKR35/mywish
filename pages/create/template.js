import { useState } from "react";
import { useRouter } from "next/router";

export default function Create() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function saveGreeting() {
    const res = await fetch("/api/greetings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });
    const data = await res.json();
    router.push(`/view/${data.id}`);
  }

  return (
    <div className="p-10 text-white grid md:grid-cols-2 gap-8">
      <div>
        <input
          className="w-full p-3 mb-4 text-black"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <textarea
          className="w-full p-3 text-black"
          placeholder="Message"
          onChange={e => setMessage(e.target.value)}
        />
        <button
          onClick={saveGreeting}
          className="mt-4 bg-yellow-400 px-6 py-3 rounded text-black"
        >
          Generate Greeting
        </button>
      </div>

      <div className="bg-white/20 p-6 rounded-xl text-center">
        <h1 className="text-3xl">🎉 Hello {name || "Friend"} 🎉</h1>
        <p className="mt-4">{message || "Your message appears here"}</p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const characters = [
  { name: "Batman", type: "hero", img: "/batman.png", description: "Descripción breve" },
  { name: "Iron Man", type: "hero", img: "/ironman.png", description: "Descripción breve" },
  { name: "Thanos", type: "villain", img: "/thanos.png", description: "Descripción breve" },
  { name: "Dr. Doom", type: "villain", img: "/drdoom.png", description: "Descripción breve" },
  { name: "Galactus", type: "villain", img: "/galactus.png", description: "Descripción breve" },
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredCharacters = characters.filter((c) =>
    (filter === "all" || c.type === filter) && c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-8">
      <input
        type="text"
        placeholder="Busca a tu superhéroe o villano..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 w-full max-w-lg rounded-lg border border-gray-300 shadow-sm"
      />

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-3 rounded text-lg ${filter === "all" ? "bg-yellow-600 text-white" : "bg-gray-300"}`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-6 py-3 rounded text-lg ${filter === "hero" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setFilter("hero")}
        >
          Superhéroe
        </button>
        <button
          className={`px-6 py-3 rounded text-lg ${filter === "villain" ? "bg-red-600 text-white" : "bg-gray-300"}`}
          onClick={() => setFilter("villain")}
        >
          Villano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredCharacters.map((char, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
            <Image
              src={char.img}
              alt={char.name}
              width={150}
              height={150}
              className="rounded-lg"
            />
            <h2 className="text-2xl font-semibold mt-4">{char.name}</h2>
            <p className="text-gray-600 text-center">{char.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

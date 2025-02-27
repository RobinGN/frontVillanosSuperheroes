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

  const filteredCharacters =
    filter === "all" ? characters : characters.filter((c) => c.type === filter);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Busca a tu superhéroe o villano
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${filter === "hero" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("hero")}
          >
            Superhéroe
          </button>
          <button
            className={`px-4 py-2 rounded ${filter === "villain" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter("villain")}
          >
            Villano
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCharacters.map((char, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg shadow">
              <Image
                src={char.img}
                alt={char.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{char.name}</h2>
              <p className="text-gray-600">{char.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

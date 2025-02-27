"use client";

import { useState } from "react";
import Image from "next/image";

const characters = [
  { name: "Batman", type: "hero", img: "/images/batman.png", description: "Descripción breve" },
  { name: "Iron Man", type: "hero", img: "/images/ironman.png", description: "Descripción breve" },
  { name: "Thanos", type: "villain", img: "/images/thanos.png", description: "Descripción breve" },
  { name: "Dr. Doom", type: "villain", img: "/images/Dr. Doom.png", description: "Descripción breve" },
  { name: "Galactus", type: "villain", img: "/images/galactus.png", description: "Descripción breve" },
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredCharacters = characters.filter(
    (c) =>
      (filter === "all" || c.type === filter) && c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="h-screen w-full flex flex-col items-center p-8"
      style={{
        backgroundImage: "url('/images/Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <input
        type="text"
        placeholder="Busca a tu superhéroe o villano..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 w-full max-w-lg rounded-full border border-gray-300 shadow-lg bg-white bg-opacity-80"
      />

      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-6 py-3 rounded-full text-lg ${
            filter === "all" ? "bg-yellow-600 text-white" : "bg-gray-300"
          } hover:bg-yellow-700 transition duration-300`}
          onClick={() => setFilter("all")}
        >
          Todos
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg ${
            filter === "hero" ? "bg-blue-600 text-white" : "bg-gray-300"
          } hover:bg-blue-700 transition duration-300`}
          onClick={() => setFilter("hero")}
        >
          Superhéroe
        </button>
        <button
          className={`px-6 py-3 rounded-full text-lg ${
            filter === "villain" ? "bg-red-600 text-white" : "bg-gray-300"
          } hover:bg-red-700 transition duration-300`}
          onClick={() => setFilter("villain")}
        >
          Villano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {filteredCharacters.map((char, index) => (
          <div
            key={index}
            className="p-6 bg-white bg-opacity-80 rounded-3xl shadow-lg flex flex-col items-center hover:shadow-xl transition duration-300"
          >
            <div className="w-36 h-36 mb-4 overflow-hidden rounded-full">
              <Image
                src={char.img}
                alt={char.name}
                width={150}
                height={150}
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-4 text-center">{char.name}</h2>
            <p className="text-gray-600 text-center">{char.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

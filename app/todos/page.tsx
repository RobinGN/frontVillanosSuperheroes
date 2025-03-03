"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Character {
  Name: string;
  Age: number;
  "Secret Identity": string;
  AKA: string;
  Species: string;
  "Place of Origin": string;
  Powers: string;
  "Net Worth": string;
  Occupation: string;
}

const images: Record<string, string> = {
  Superman: "/images/SuperHeroes/Superman.png",
  Batman: "/images/SuperHeroes/Batman.png",
  GreenLantern: "/images/SuperHeroes/GreenLantern.png",
  Flash: "/images/SuperHeroes/Flash.png",
  Nightwing: "/images/SuperHeroes/Night.png",
  Aquaman: "/images/SuperHeroes/Aquaman.png",
  GreenArrow: "/images/SuperHeroes/GreenArrow.png",
  "Lex Luthor": "/images/Villains/LexLuthor.png",
  Joker: "/images/Villains/Joker.png",
  Merlyn: "/images/Villains/Merlyn.png",
  "Black Manta": "/images/Villains/BlackManta.png",
  Deathstroke: "/images/Villains/Deathstroke.png",
  "Reverse-Flash": "/images/Villains/Reverse-flash.png",
};

export default function TodosPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("a-z");
  const [selectedCity, setSelectedCity] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSuperheroes = fetch("http://localhost:3001/api/LigaDeLaJusticia/superheroes").then((res) => res.json());
    const fetchVillains = fetch("http://localhost:3001/api/LigaDeLaJusticia/supervillians").then((res) => res.json());

    Promise.all([fetchSuperheroes, fetchVillains])
      .then(([heroesData, villainsData]) => {
        const allCharacters = [...heroesData, ...villainsData];
        setCharacters(allCharacters);
        setFilteredCharacters(allCharacters);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  useEffect(() => {
    let sorted = [...characters].filter((char) =>
      char.Name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCity) {
      sorted = sorted.filter((char) => char["Place of Origin"] === selectedCity);
    }

    switch (sortOrder) {
      case "a-z":
        sorted.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "z-a":
        sorted.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "age-asc":
        sorted.sort((a, b) => a.Age - b.Age);
        break;
      case "age-desc":
        sorted.sort((a, b) => b.Age - a.Age);
        break;
    }

    setFilteredCharacters(sorted);
  }, [search, sortOrder, selectedCity, characters]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-8 text-white" style={{
      backgroundImage: "url('/images/ALL.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <h1 className="text-4xl font-bold mb-6">Lista de Todos los Personajes</h1>

      <button onClick={() => router.push("/")} className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition">← Regresar</button>
      
      <div className="mb-4 flex flex-wrap gap-4">
        <input type="text" placeholder="Buscar por nombre" value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 rounded bg-white text-black" />
        <select onChange={(e) => setSortOrder(e.target.value)} className="p-2 rounded bg-white text-black">
          <option value="a-z">Orden A-Z</option>
          <option value="z-a">Orden Z-A</option>
          <option value="age-asc">Edad: Menor a Mayor</option>
          <option value="age-desc">Edad: Mayor a Menor</option>
        </select>
        <select onChange={(e) => setSelectedCity(e.target.value)} className="p-2 rounded bg-white text-black">
          <option value="">Filtrar por Ciudad</option>
          {[...new Set(characters.map((char) => char["Place of Origin"]))].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {filteredCharacters.map((character, index) => {
          const characterKey = images[character.Name] ? character.Name : character.Name.replace(/\s+/g, "");
          return (
            <div key={index} className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full">
              <img src={images[characterKey] || "/images/default.png"} alt={character.Name} className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md" />
              <h2 className="text-2xl font-semibold text-center mt-4">{character.Name}</h2>
              <div className="mt-4 text-gray-700 w-full text-sm">
                <p><strong>Edad:</strong> {character.Age}</p>
                <p><strong>Identidad Secreta:</strong> {character["Secret Identity"]}</p>
                <p><strong>Alias:</strong> {character.AKA}</p>
                <p><strong>Especie:</strong> {character.Species}</p>
                <p><strong>Origen:</strong> {character["Place of Origin"]}</p>
                <p><strong>Poderes:</strong> {character.Powers}</p>
                <p><strong>Fortuna:</strong> {character["Net Worth"]}</p>
                <p><strong>Ocupación:</strong> {character.Occupation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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

// Diccionario combinado de imágenes para héroes y villanos
const images: Record<string, string> = {
  // Superhéroes
  Superman: "/images/SuperHeroes/Superman.png",
  Batman: "/images/SuperHeroes/Batman.png",
  GreenLantern: "/images/SuperHeroes/GreenLantern.png",
  Flash: "/images/SuperHeroes/Flash.png",
  Nightwing: "/images/SuperHeroes/Night.png",
  Aquaman: "/images/SuperHeroes/Aquaman.png",
  GreenArrow: "/images/SuperHeroes/GreenArrow.png",
  
  // Villanos
  "Lex Luthor": "/images/Villains/LexLuthor.png",
  "Joker": "/images/Villains/Joker.png",
  "Merlyn": "/images/Villains/Merlyn.png",
  "Black Manta": "/images/Villains/BlackManta.png",
  "Deathstroke": "/images/Villains/Deathstroke.png",
  "Reverse-Flash": "/images/Villains/Reverse-flash.png",
};

export default function TodosPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSuperheroes = fetch("http://localhost:3001/api/LigaDeLaJusticia/superheroes").then((res) => res.json());
    const fetchVillains = fetch("http://localhost:3001/api/LigaDeLaJusticia/supervillians").then((res) => res.json());

    Promise.all([fetchSuperheroes, fetchVillains])
      .then(([heroesData, villainsData]) => {
        setCharacters([...heroesData, ...villainsData]);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8 text-white"
      style={{
        backgroundImage: "url('/images/ALL.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-4xl font-bold mb-6">Lista de Todos los Personajes</h1>

      {/* Botón de regreso */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
      >
        ← Regresar
      </button>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {characters.map((character, index) => {
          const characterKey = images[character.Name] 
            ? character.Name  // Si el nombre coincide con el diccionario (villanos)
            : character.Name.replace(/\s+/g, ""); // Para los héroes sin espacios

          return (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full"
            >
              {/* Imagen del personaje */}
              <img
                src={images[characterKey] || "/images/default.png"}
                alt={character.Name}
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 shadow-md"
              />

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

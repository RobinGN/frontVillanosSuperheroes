"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperheroesPage() {
  const [superheroes, setSuperheroes] = useState([]);
  const router = useRouter();

  // Diccionario de imágenes basado en nombres sin espacios
  const images = {
    Superman: "/images/SuperHeroes/Superman.png",
    Batman: "/images/SuperHeroes/Batman.png",
    GreenLantern: "/images/SuperHeroes/GreenLantern.png",
    Flash: "/images/SuperHeroes/Flash.png",
    Nightwing: "/images/SuperHeroes/Night.png",
    Aquaman: "/images/SuperHeroes/Aquaman.png",
    GreenArrow: "/images/SuperHeroes/GreenArrow.png"
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/superheroes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setSuperheroes(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8 text-white relative"
      style={{
        backgroundImage: "url('/images/JL.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Botón de regreso */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        ← Regresar
      </button>

      <h1 className="text-4xl font-bold mb-6">Lista de Superhéroes</h1>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {superheroes.map((hero, index) => {
          // Normalizar el nombre eliminando espacios para buscar en el diccionario
          const normalizedHeroName = hero.Name.replace(/\s+/g, "");
          
          return (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full"
            >
              {/* Imagen del superhéroe con sombra */}
              <img
                src={images[normalizedHeroName] || "/images/default.png"} // Usa imagen por defecto si no hay coincidencia
                alt={hero.Name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-300 shadow-md"
              />

              <h2 className="text-2xl font-semibold text-center">{hero.Name}</h2>

              <div className="mt-4 text-gray-700 w-full text-sm">
                <p><strong>Edad:</strong> {hero.Age}</p>
                <p><strong>Identidad Secreta:</strong> {hero["Secret Identity"]}</p>
                <p><strong>Alias:</strong> {hero.AKA}</p>
                <p><strong>Especie:</strong> {hero.Species}</p>
                <p><strong>Origen:</strong> {hero["Place of Origin"]}</p>
                <p><strong>Poderes:</strong> {hero.Powers}</p>
                <p><strong>Fortuna:</strong> {hero["Net Worth"]}</p>
                <p><strong>Ocupación:</strong> {hero.Occupation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

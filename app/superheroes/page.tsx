"use client";

import { useState, useEffect } from "react";

export default function SuperheroesPage() {
  const [superheroes, setSuperheroes] = useState([]);

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
      className="h-screen w-full flex flex-col items-center p-8 text-white"
      style={{
        backgroundImage: "url('/images/JL.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
    <div className="h-screen w-full flex flex-col items-center p-8 text-white">
      <h1 className="text-4xl font-bold mb-6">Lista de Superhéroes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {superheroes.map((hero, index) => (
          <div
            key={index}
            className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full"
          >
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
        ))}
      </div>
    </div>
    </div>
  );
}

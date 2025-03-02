"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VillainsPage() {
  const [villains, setVillains] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/supervillians")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de villanos recibidos:", data);
        setVillains(data);
      })
      .catch((error) => console.error("Error al obtener villanos:", error));
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8 text-white"
      style={{
        backgroundImage: "url('/images/JLV.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-4xl font-bold mb-6">Lista de Villanos</h1>

       {/* Botón de regreso */}
       <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-red-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        ← Regresar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {villains.map((villain, index) => (
          <div
            key={index}
            className="p-6 bg-white bg-opacity-70 rounded-3xl shadow-lg flex flex-col items-center text-black w-full"
          >
            <h2 className="text-2xl font-semibold text-center">{villain.Name}</h2>

            <div className="mt-4 w-full text-sm">
              <p><strong>Edad:</strong> {villain.Age}</p>
              <p><strong>Identidad Secreta:</strong> {villain["Secret Identity"]}</p>
              <p><strong>Alias:</strong> {villain.AKA}</p>
              <p><strong>Especie:</strong> {villain.Species}</p>
              <p><strong>Origen:</strong> {villain["Place of Origin"]}</p>
              <p><strong>Poderes:</strong> {villain.Powers}</p>
              <p><strong>Fortuna:</strong> {villain["Net Worth"]}</p>
              <p><strong>Ocupación:</strong> {villain.Occupation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VillainsPage() {
  const [villains, setVillains] = useState([]);
  const [filter, setFilter] = useState("default");
  const [originFilter, setOriginFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const images = {
    "Lex Luthor": "/images/Villains/LexLuthor.png",
    "Joker": "/images/Villains/Joker.png",
    "Merlyn": "/images/Villains/Merlyn.png",
    "Black Manta": "/images/Villains/BlackManta.png",
    "Deathstroke": "/images/Villains/Deathstroke.png",
    "Reverse-Flash": "/images/Villains/Reverse-flash.png"
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/supervillians")
      .then((res) => res.json())
      .then((data) => setVillains(data))
      .catch((error) => console.error("Error al obtener villanos:", error));
  }, []);

  const getSortedVillains = () => {
    let filteredVillains = [...villains];

    if (searchTerm) {
      filteredVillains = filteredVillains.filter(villain =>
        villain.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (originFilter !== "all") {
      filteredVillains = filteredVillains.filter(villain => villain["Place of Origin"] === originFilter);
    }

    switch (filter) {
      case "az":
        filteredVillains.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "za":
        filteredVillains.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "ageAsc":
        filteredVillains.sort((a, b) => a.Age - b.Age);
        break;
      case "ageDesc":
        filteredVillains.sort((a, b) => b.Age - a.Age);
        break;
      default:
        return filteredVillains;
    }

    return filteredVillains;
  };

  const uniqueOrigins = ["all", ...new Set(villains.map(villain => villain["Place of Origin"]))];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8 text-white relative"
      style={{
        backgroundImage: "url('/images/JLV.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-red-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        ← Regresar
      </button>

      <h1 className="text-4xl font-bold mb-6">Lista de Villanos</h1>

      <div className="flex items-center w-full max-w-3xl mb-6 gap-4">
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar villano..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 text-black rounded-lg flex-grow shadow-md"
        />
        
        {/* Filtros */}
        <select onChange={(e) => setFilter(e.target.value)} className="bg-gray-800 px-4 py-2 rounded-lg text-white">
          <option value="default">Ordenar por...</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
          <option value="ageAsc">Edad ⬆</option>
          <option value="ageDesc">Edad ⬇</option>
        </select>
        <select onChange={(e) => setOriginFilter(e.target.value)} value={originFilter} className="bg-gray-800 px-4 py-2 rounded-lg text-white">
          {uniqueOrigins.map((origin, index) => (
            <option key={index} value={origin} className="text-black">{origin === "all" ? "Todos los orígenes" : origin}</option>
          ))}
        </select>
      </div>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {getSortedVillains().map((villain, index) => {
          const normalizedVillainName = Object.keys(images).find(
            (key) => key.toLowerCase() === villain.Name.toLowerCase()
          );

          return (
            <div key={index} className="p-6 bg-white bg-opacity-70 rounded-3xl shadow-lg flex flex-col items-center text-black w-full">
              <div className="flex items-center justify-center w-full">
                <img
                  src={images[normalizedVillainName] || "/images/default.png"}
                  alt={villain.Name}
                  className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-300 shadow-md"
                />
              </div>
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
          );
        })}
      </div>
    </div>
  );
}

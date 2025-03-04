"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VillainsPage() {
  const [villains, setVillains] = useState([]);
  const [filter, setFilter] = useState("default");
  const [originFilter, setOriginFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteQuery, setDeleteQuery] = useState("");
  const router = useRouter();

  const images = {
    "LexLuthor": "/images/Villains/lexluthor.png",
    "Joker": "/images/Villains/Joker.png",
    "Merlyn": "/images/Villains/Merlyn.png",
    "BlackManta": "/images/Villains/Blackmanta.png",
    "Deathstroke": "/images/Villains/Deathstroke.png",
    "Reverse-Flash": "/images/Villains/Reverse-flash.png"
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/supervillians")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setVillains(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  }, []);

  const getFilteredVillains = () => {
    let filteredVillains = [...villains];

    if (searchQuery.trim() !== "") {
      filteredVillains = filteredVillains.filter(villain =>
        villain.Name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const deleteVillain = () => {
    if (!deleteQuery.trim()) return;
    
    fetch(`http://localhost:3001/api/LigaDeLaJusticia/supervillians/${deleteQuery}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setVillains(villains.filter(villain => villain.Name.toLowerCase() !== deleteQuery.toLowerCase()));
          setDeleteQuery("");
        } else {
          console.error("Error al eliminar el villano");
        }
      })
      .catch((error) => console.error("Error en la solicitud de eliminación:", error));
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

      <h1 className="text-4xl font-bold mb-6 text-white-800">Lista de Villanos</h1>

      <div className="mb-4 flex flex-wrap gap-4">
        <input 
          type="text" 
          placeholder="Buscar por nombre" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="px-4 py-2 rounded bg-white text-black" 
        />
        <select onChange={(e) => setFilter(e.target.value)} className="p-2 rounded bg-white text-black">
          <option value="az">Orden A-Z</option>
          <option value="za">Orden Z-A</option>
          <option value="ageAsc">Edad: Menor a Mayor</option>
          <option value="ageDesc">Edad: Mayor a Menor</option>
        </select>
        <select onChange={(e) => setOriginFilter(e.target.value)} className="p-2 rounded bg-white text-black">
          <option value="all">Filtrar por Ciudad</option>
          {uniqueOrigins.map((city, index) => (
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex gap-4">
        <input 
          type="text" 
          placeholder="Eliminar villano por nombre" 
          value={deleteQuery} 
          onChange={(e) => setDeleteQuery(e.target.value)} 
          className="px-4 py-2 rounded bg-white text-black" 
        />
        <button 
          onClick={deleteVillain} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-500 transition"
        >
          Eliminar
        </button>
      </div>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {getFilteredVillains().map((villain, index) => {
          const normalizedVillainName = villain.Name.replace(/\s+/g, "");

          return (
            <div key={index} className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full">
              <img
                src={images[normalizedVillainName] || "/images/default.png"}
                alt={villain.Name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-300 shadow-md"
              />
              <h2 className="text-2xl font-semibold text-center">{villain.Name}</h2>
              <div className="mt-4 text-gray-700 w-full text-sm">
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

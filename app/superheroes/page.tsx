"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuperheroesPage() {
  const [superheroes, setSuperheroes] = useState([]);
  const [filter, setFilter] = useState("default");
  const [originFilter, setOriginFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [heroToDelete, setHeroToDelete] = useState(""); // Estado para eliminar héroes
  const router = useRouter();

  const images = {
    Superman: "/images/SuperHeroes/Superman.png",
    Batman: "/images/SuperHeroes/Batman.png",
    GreenLantern: "/images/SuperHeroes/GreenLantern.png",
    Flash: "/images/SuperHeroes/Flash.png",
    Nightwing: "/images/SuperHeroes/Night.png",
    Aquaman: "/images/SuperHeroes/Aquaman.png",
    GreenArrow: "/images/SuperHeroes/GreenArrow.png",
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = () => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/superheroes")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        setSuperheroes(data);
      })
      .catch((error) => console.error("Error al obtener datos:", error));
  };

  const handleDelete = async () => {
    if (!heroToDelete.trim()) {
      alert("Por favor, ingresa un nombre válido.");
      return;
    }

    const url = `http://localhost:3001/api/LigaDeLaJusticia/Superheroes/${heroToDelete}`;
    
    try {
      const response = await fetch(url, { method: "DELETE" });

      if (response.ok) {
        alert(`Superhéroe "${heroToDelete}" eliminado correctamente.`);
        setHeroToDelete(""); 
        fetchSuperheroes(); 
      } else {
        alert(`Error al eliminar el superhéroe "${heroToDelete}".`);
      }
    } catch (error) {
      console.error("Error en la petición DELETE:", error);
      alert("Hubo un error al intentar eliminar el superhéroe.");
    }
  };

  const getFilteredSuperheroes = () => {
    let filteredHeroes = [...superheroes];

    if (searchQuery.trim() !== "") {
      filteredHeroes = filteredHeroes.filter((hero) =>
        hero.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (originFilter !== "all") {
      filteredHeroes = filteredHeroes.filter((hero) => hero["Place of Origin"] === originFilter);
    }

    switch (filter) {
      case "az":
        filteredHeroes.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "za":
        filteredHeroes.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "ageAsc":
        filteredHeroes.sort((a, b) => a.Age - b.Age);
        break;
      case "ageDesc":
        filteredHeroes.sort((a, b) => b.Age - a.Age);
        break;
      default:
        return filteredHeroes;
    }

    return filteredHeroes;
  };

  const uniqueOrigins = ["all", ...new Set(superheroes.map((hero) => hero["Place of Origin"]))];

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
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        ← Regresar
      </button>

      <h1 className="text-4xl font-bold mb-6 text-gray-800">Lista de Superhéroes</h1>

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
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Campo para eliminar superhéroe */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Superhéroe a eliminar"
          value={heroToDelete}
          onChange={(e) => setHeroToDelete(e.target.value)}
          className="px-4 py-2 rounded bg-white text-black"
        />
        <button
          onClick={handleDelete}
          className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition duration-300"
        >
          Eliminar
        </button>
      </div>

      <div className="w-full flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {getFilteredSuperheroes().map((hero, index) => {
          const normalizedHeroName = hero.Name.replace(/\s+/g, "");

          return (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full"
            >
              <img
                src={images[normalizedHeroName] || "/images/default.png"}
                alt={hero.Name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-300 shadow-md"
              />
              <h2 className="text-2xl font-semibold text-center">{hero.Name}</h2>
              <div className="mt-4 text-gray-700 w-full text-sm">
                <p>
                  <strong>Edad:</strong> {hero.Age}
                </p>
                <p>
                  <strong>Identidad Secreta:</strong> {hero["Secret Identity"]}
                </p>
                <p>
                  <strong>Alias:</strong> {hero.AKA}
                </p>
                <p>
                  <strong>Especie:</strong> {hero.Species}
                </p>
                <p>
                  <strong>Origen:</strong> {hero["Place of Origin"]}
                </p>
                <p>
                  <strong>Poderes:</strong> {hero.Powers}
                </p>
                <p>
                  <strong>Fortuna:</strong> {hero["Net Worth"]}
                </p>
                <p>
                  <strong>Ocupación:</strong> {hero.Occupation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoPersonaje, setTipoPersonaje] = useState("superheroe");
  const [personaje, setPersonaje] = useState({
    Name: "",
    Age: "",
    "Secret Identity": "",
    AKA: "",
    Species: "",
    "Place of Origin": "",
    Powers: "",
    "Net Worth": "",
    Occupation: "",
    "Base of Operations": "",
    Nemesis: "",
    "Fun fact": "",
    "Favorite food": "",
  });
  const [mostrarFormModificar, setMostrarFormModificar] = useState(false);
  const [tipoModificar, setTipoModificar] = useState("superheroe");
  const [nombrePersonaje, setNombrePersonaje] = useState("");
  const [campoModificar, setCampoModificar] = useState("age");
  const [nuevoValor, setNuevoValor] = useState("");

  const handleChange = (e) => {
    setPersonaje({ ...personaje, [e.target.name]: e.target.value });
  };

  const agregarPersonaje = async (e) => {
    e.preventDefault();

    const tieneDatos = Object.values(personaje).some((valor) => valor.trim() !== "");
    if (!tieneDatos) {
      alert("Por favor, completa al menos un campo.");
      return;
    }

    const rutaAPI = tipoPersonaje === "superheroe"
      ? "http://localhost:3001/api/LigaDeLaJusticia/NEWsuperheroe"
      : "http://localhost:3001/api/LigaDeLaJusticia/NEWsupervillian";

    try {
      const response = await fetch(rutaAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personaje),
      });

      if (!response.ok) {
        throw new Error("Error al crear el personaje");
      }

      const data = await response.json();
      console.log("Personaje creado:", data);

      setPersonaje({
        Name: "",
        Age: "",
        "Secret Identity": "",
        AKA: "",
        Species: "",
        "Place of Origin": "",
        Powers: "",
        "Net Worth": "",
        Occupation: "",
        "Base of Operations": "",
        Nemesis: "",
        "Fun fact": "",
        "Favorite food": "",
      });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al agregar el personaje.");
    }
  };

  const handleModificar = async (e) => {
    e.preventDefault();
    
    if (!nombrePersonaje.trim() || !nuevoValor.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }
  
    const endpoint = campoModificar.toLowerCase().replace(/ /g, '');
    const tipo = tipoModificar === "superheroe" ? "Superheroes" : "supervillians";
    
    try {
      const response = await fetch(
        `http://localhost:3001/api/LigaDeLaJusticia/${tipo}/${encodeURIComponent(nombrePersonaje)}/${endpoint}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Update: nuevoValor }),
        }
      );
  
      if (!response.ok) throw new Error("Error en la modificación");
      
      //alert("Modificación exitosa!");
      setNombrePersonaje("");
      setNuevoValor("");
      setMostrarFormModificar(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al modificar el personaje");
    }
  };

  return (
    <div
      className="h-screen w-full flex flex-col items-center p-1 bg-black"
      style={{
        backgroundImage: "url('/images/DCSP.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 130px",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="absolute top-4 left-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        {mostrarFormulario ? "Cerrar" : "Agregar Personaje"}
      </button>

      {mostrarFormulario && (
        <form
          onSubmit={agregarPersonaje}
          className="absolute top-16 left-4 bg-white p-4 rounded-lg shadow-lg w-80"
        >
          <label className="block text-sm font-bold mb-2">Tipo de personaje:</label>
          <select
            value={tipoPersonaje}
            onChange={(e) => setTipoPersonaje(e.target.value)}
            className="w-full p-1 border rounded mb-2"
          >
            <option value="superheroe">Superhéroe</option>
            <option value="villano">Villano</option>
          </select>

          {Object.keys(personaje).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-bold">{key}:</label>
              <input
                type="text"
                name={key}
                value={personaje[key]}
                onChange={handleChange}
                className="w-full p-1 border rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700"
          >
            Guardar Personaje
          </button>
        </form>
      )}

      <button
        onClick={() => setMostrarFormModificar(!mostrarFormModificar)}
        className="absolute top-4.5 left-48 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
      >
        {mostrarFormModificar ? "Cerrar" : "Modificar Personaje"}
      </button>

      {mostrarFormModificar && (
        <form
          onSubmit={handleModificar}
          className="absolute top-16 left-44 bg-white p-4 rounded-lg shadow-lg w-80"
        >
          <div className="mb-2">
            <label className="block text-sm font-bold mb-2">Tipo de personaje:</label>
            <select
              value={tipoModificar}
              onChange={(e) => setTipoModificar(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="superheroe">Superhéroe</option>
              <option value="villano">Villano</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold">Nombre del personaje:</label>
            <input
              type="text"
              value={nombrePersonaje}
              onChange={(e) => setNombrePersonaje(e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold">Campo a modificar:</label>
            <select
              value={campoModificar}
              onChange={(e) => setCampoModificar(e.target.value)}
              className="w-full p-1 border rounded"
            >
              <option value="age">Edad</option>
              <option value="nemesis">Nemesis</option>
              <option value="Favorite food">Comida favorita</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-bold">Nuevo valor:</label>
            <input
              type="text"
              value={nuevoValor}
              onChange={(e) => setNuevoValor(e.target.value)}
              className="w-full p-1 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg mt-2 hover:bg-orange-700"
          >
            Modificar
          </button>
        </form>
      )}

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center">
        Liga de la Justicia
      </h1>
      <p className="text-lg md:text-xl text-white mb-6 text-center">
        Explora nuestra base de datos de superhéroes y villanos.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-xl">
        <Link href="/todos">
          <button className="px-6 py-3 rounded-full text-lg bg-gray-600 text-white hover:bg-gray-700 transition duration-300 w-full sm:w-auto">
            Todos
          </button>
        </Link>
        <Link href="/superheroes">
          <button className="px-6 py-3 rounded-full text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300 w-full sm:w-auto">
            Superhéroes
          </button>
        </Link>
        <Link href="/villanos">
          <button className="px-6 py-3 rounded-full text-lg bg-red-600 text-white hover:bg-red-700 transition duration-300 w-full sm:w-auto">
            Villanos
          </button>
        </Link>
        <Link href="/organization">
          <button className="px-6 py-3 rounded-full text-lg bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300 w-full sm:w-auto">
            Organización
          </button>
        </Link>
      </div>
    </div>
  );
}

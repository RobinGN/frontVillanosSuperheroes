"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrganizationPage() {
  const [organization, setOrganization] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/Organization")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de la organización recibidos:", data);
        setOrganization(data);
      })
      .catch((error) => console.error("Error al obtener datos de la organización:", error));
  }, []);

  if (!organization) {
    return <div className="h-screen flex justify-center items-center text-white">Cargando...</div>;
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-8 text-white relative"
      style={{
        backgroundImage: "url('/images/JUS.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Botón de regreso */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 bg-yellow-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-white-700 transition"
      >
        ← Regresar
      </button>

      <h1 className="text-4xl font-bold mb-6">Información de la Organización</h1>

      <div className="p-6 bg-white bg-opacity-90 rounded-3xl shadow-lg flex flex-col items-center text-black w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center">{organization.Name}</h2>

        <div className="mt-4 text-gray-700 w-full text-lg">
          <p><strong>Ubicación:</strong> {organization.Ubication}</p>
          <p><strong>Fecha de Inauguración:</strong> {organization["Inauguration Date"]}</p>
          <p><strong>Propietario:</strong> {organization.Owner}</p>
          <p><strong>Estado:</strong> {organization.Status}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center p-1 bg-black" // Fondo negro por defecto
      style={{
        backgroundImage: "url('/images/DCSP.png')",
        backgroundSize: "cover",
        backgroundPosition: "center 130px",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "black", // Fondo negro adicional por si la imagen no carga
      }}
    >
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

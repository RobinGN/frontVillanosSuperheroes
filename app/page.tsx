"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="h-screen w-full flex flex-col items-center p-8"
      style={{
        backgroundImage: "url('/images/Background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-4xl font-bold text-white mb-6">Liga de la Justicia</h1>
      <p className="text-lg text-white mb-6">Explora nuestra base de datos de superhéroes y villanos.</p>

      <div className="flex justify-center gap-4 mb-6">
        <Link href="/todos">
          <button className="px-6 py-3 rounded-full text-lg bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300">
            Todos
          </button>
        </Link>
        <Link href="/superheroes">
          <button className="px-6 py-3 rounded-full text-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            Superhéroe
          </button>
        </Link>
        <Link href="/villanos">
          <button className="px-6 py-3 rounded-full text-lg bg-red-600 text-white hover:bg-red-700 transition duration-300">
            Villano
          </button>
        </Link>
      </div>
    </div>
  );
}

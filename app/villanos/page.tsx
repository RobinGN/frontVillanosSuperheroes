"use client";

import { useEffect, useState } from "react";

interface Villain {
  id: number;
  nombre: string;
  habilidad: string;
}

export default function Villanos() {
  const [villanos, setVillanos] = useState<Villain[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/LigaDeLaJusticia/villanos")
      .then((res) => res.json())
      .then((data) => setVillanos(data))
      .catch((error) => console.error("Error fetching villanos:", error));
  }, []);

  return (
    <div>
      <h1>Villanos</h1>
      <ul>
        {villanos.map((villain) => (
          <li key={villain.id}>
            <strong>{villain.nombre}</strong>: {villain.habilidad}
          </li>
        ))}
      </ul>
    </div>
  );
}

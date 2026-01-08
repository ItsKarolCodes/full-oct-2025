import { useState, useEffect } from "react";

function ListMonsters() {
  const [monsters, setMonsters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Creamos el controlador
    const controller = new AbortController();

    const fetchMonsters = async () => {
      try {
        setError(null);

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        };

        const response = await fetch('https://www.dnd5eapi.co/api/monsters', options);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Tenemos que verificar si existe 'data.results' y si es un array.
        if (data.results && Array.isArray(data.results)) {
          setMonsters(data.results);
        } else {
          setMonsters([]);
          console.error("Formato inesperado:", data);
        }

      } catch (err) {
        if (err.name === 'AbortError') return;
        
        console.error("Error al obtener monstruos:", err);
        setError("No se pudieron cargar los monstruos.");
      }
    };

    fetchMonsters();

    // 3. Cleanup: Esto cancela la petición SOLO si el componente se desmonta
    return () => controller.abort();

  }, []);

  if (error) return <p style={{ color: "red" }}>⚠️ {error}</p>;

  return (
    <>
      <h2>Listado de monstruos</h2>
      <ul>
        {monsters.map((monster) => (
          // Usamos monster.index como key porque es único en esta API
          <li key={monster.index}>
            <p><strong>Nombre:</strong> {monster.name}</p>
            <p><strong>URL del monstruo:</strong> {monster.url}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListMonsters;
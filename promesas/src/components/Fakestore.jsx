import { useState, useEffect } from "react";

function Fakestore() {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Creamos el AbortController
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setError(null); // Limpiamos errores previos si los hubiera

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal // Conectamos el controlador
        };

        const response = await fetch('https://fakestoreapi.com/products', options);

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // 2. Verificamos que sea un Array para evitar errores en el .map
        if (Array.isArray(data)) {
          setStores(data);
        } else {
          setStores([]); // Si llega algo raro, lista vacía
          console.error("La API no devolvió una lista:", data);
        }

      } catch (err) {
        // Ignoramos el error si es por cancelación (desmontar componente)
        if (err.name === 'AbortError') {
          return;
        }
        console.error("Error cargando productos:", err);
        setError("Error al cargar los productos");
      }
    };

    fetchProducts();

    // 3. Cleanup: Cancelamos la petición si el usuario sale de la página
    return () => controller.abort();

  }, []);

  // Si hay error, mostramos mensaje. Si no, mostramos la lista (o nada si está vacía)
  if (error) return <div style={{color: "red", marginTop: "20px"}}> {error}</div>;

  return (
    <>
      <h2>Listado de productos</h2>
      <ul>
        {stores.map((store) => (
          <li key={store.id} style={{ marginBottom: "30px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
            <img 
              src={store.image}
              alt={store.title}
              style={{width:"100px", display: "block", marginBottom: "10px"}}
            />
    
            <p><strong>ID:</strong> {store.id}</p>
            <p><strong>Producto:</strong> {store.title}</p>
            <p><strong>Precio:</strong> ${store.price}</p>
            <p><strong>Categoría:</strong> {store.category}</p>
            <p><strong>Descripción:</strong> {store.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Fakestore;
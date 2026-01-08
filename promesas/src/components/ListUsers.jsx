import { useState, useEffect } from "react";

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Creamos el controlador de cancelación
        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
                setError(null);

                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    signal: controller.signal
                };

                const response = await fetch("https://randomuser.me/api/?results=10", options);

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();

                // 2. Validación: RandomUser devuelve { results: [...] }
                if (data.results && Array.isArray(data.results)) {
                    setUsers(data.results);
                } else {
                    setUsers([]);
                    console.error("Formato de datos incorrecto:", data);
                }

            } catch (err) {
                // Ignoramos el error si es por cancelar la petición
                if (err.name === 'AbortError') return;

                console.error("Error al obtener usuarios:", err);
                setError("No se pudieron cargar los usuarios.");
            }
        };

        fetchUsers();

        // 3. Cleanup al desmontar
        return () => controller.abort();

    }, []);

    // Si hay error, lo mostramos
    if (error) return <p style={{ color: "red" }}>⚠️ {error}</p>;

    return (
        <>
            <h2>Usuarios aleatorios</h2>

            <ul>
                {users.map((user) => (
                    // Si la API no diera ID, entonces usaríamos index, pero aquí sí da.
                    <li key={user.login.uuid || user.email}> 
                        <img
                            src={user.picture.medium}
                            alt={user.name.first}
                            style={{ width: "100px", height: "100px",borderRadius: "50px", marginRight: "10px", verticalAlign: "middle" }}
                        />

                        {/* Usamos un contenedor para alinear texto */}
                        <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                            <p><strong>Nombre:</strong> {user.name.first} {user.name.last}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>País:</strong> {user.location.country}</p>
                        </div>
                        <hr style={{ margin: "20px 0" }} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ListUsers;
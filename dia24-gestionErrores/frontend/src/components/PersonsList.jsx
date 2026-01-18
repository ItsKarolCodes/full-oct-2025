import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PersonsList = () => {
    const [persons, setPersons] = useState([]);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const res = await fetch(`${apiUrl}/persons`);
                
                if (!res.ok) throw new Error("No se pudo obtener la lista");
                
                const data = await res.json();
                setPersons(data); // Guardamos los datos si todo va bien

            } catch (err) {
                console.error("Error:", err);
                setError(err); // Guardamos el error si falla

            } finally {
                // Se ejecuta siempre, haya funcionado o fallado, lo usamos para confirmar en consola.
                console.log("El fetch ha terminado su ejecución."); 
            }
        };
        fetchPersons();
    }, []);

    // --- DELETE (Borrado) ---
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/persons/${id}`, { 
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error deleting person");

            // Actualizamos la lista visualmente 
            setPersons(persons.filter((p) => p.id !== id)); 
            alert("Borrado correctamente");

        } catch (err) {
            console.error(err);
            alert("Error al borrar");

        } finally {
            
            console.log("Intento de borrado finalizado para el ID:", id);
        }
    };

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h2>Persons List</h2>

            <Link to="/persons/create">Create Person</Link>

            {persons.length === 0 ? (
                <p>No persons found.</p>
            ) : (
                <ul>
                    {persons.map((person) => (
                        <li key={person.id}>
                            {person.name} {person.surname}{" "}
                            <Link to={`/persons/${person.id}`}>View</Link>{" "}
                            <button onClick={() => handleDelete(person.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PersonsList;
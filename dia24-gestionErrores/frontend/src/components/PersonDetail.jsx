import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PersonDetail = () => {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchPersonData = async() => {
            try{
            //hacemos el fetch esperando la respuesta
            const res = await fetch(`${apiUrl}/persons/${id}`)
            //verificamos si hubo error en el servidor
            if (!res.ok) throw new Error("Error fetching person");

            //convertimos a JSON esperando el resultado
            const data = await res.json();
            //guardamos los datos
            setPerson(data);
        } catch (err) {
            //si algo falla, guardamos el error
            setError(err);

        } finally {
            console.log("intento de carga finalizado")
        }
        };
        fetchPersonData();
    }, [id]);

    if (error) return <p>Error: {error.message}</p>;
    if (!person) return <p>Cargando datos...</p>;

    return (
        <div>

            <Link to="/" className="btn-back">← Volver a la lista</Link>
            <h2>Person Detail</h2>
            <p><strong>Name:</strong> {person.name}</p>
            <p><strong>Surname:</strong> {person.surname}</p>
            <p><strong>Birthdate:</strong> {person.birthdate}</p>
            <p><strong>Is Teacher:</strong> {person.isTeacher ? "Yes" : "No"}</p>
            
        </div>
    );
};

export default PersonDetail;

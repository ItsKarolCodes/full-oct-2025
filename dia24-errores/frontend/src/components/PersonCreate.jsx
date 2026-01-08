import { useState } from "react";

const PersonCreate = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        birthdate: "",
        isTeacher: false,
    });

    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => { // 1. Hacemos la función asíncrona
    e.preventDefault();

    try {
        // 2. Intentamos hacer la petición
        const response = await fetch(`${apiUrl}/persons`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Verificamos si la respuesta fue exitosa (200-299)
        if (!response.ok) {
            throw new Error("Error en la petición al servidor");
        }

        const data = await response.json(); // Esperamos a convertir los datos

        // Si llegamos aquí, todo ha ido bien
        alert("Person created!");
        console.log("Created:", data);

    } catch (err) {
        // 3. Si hay error cae aquí
        console.error("Error creating person:", err);
        alert("Hubo un error al crear la persona");

    } finally {
        // 4. ESTO SE EJECUTA SIEMPRE (haya éxito o error)
        console.log("Petición finalizada");
    }
};

    return (
        <div>
            <h2>Create Person</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                />
                <br />

                <input
                    type="checkbox"
                    name="isTeacher"
                    checked={formData.isTeacher}
                    onChange={handleChange}
                />
                Is teacher <br />

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default PersonCreate;

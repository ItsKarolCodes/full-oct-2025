import { useState, useEffect } from "react";

function ListUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch("https://randomuser.me/api/?results=10") // pedimos 10 usuarios
            .then(res => res.json())
            .then(data => setUsers(data.results))
            .catch(err => console.log(err));

    }, []);

    return (
        <>
            <h2>Usuarios aleatorios</h2>

            <ul>
                {
                    users.map((user, index) => (
                        <li key={index}>
                            <img
                                src={user.picture.medium}
                                alt={user.name.first}
                                style={{ borderRadius: "50px" }}
                            />

                            <p>Nombre: {user.name.first} {user.name.last}</p>
                            <p>Email: {user.email}</p>
                            <p>País: {user.location.country}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default ListUsers;

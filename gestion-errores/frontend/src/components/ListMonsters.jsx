import { useState, useEffect } from "react";

function ListMonsters() {

const [monsters, setMonsters] = useState([]);

useEffect(() => {
    
    let controller = new AbortController();
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        signal: controller.signal
    };

    fetch('https://www.dnd5eapi.co/api/monsters', options)
        .then((res) => res.json())
        .then((data) => setMonsters(data.results))
        .catch((err) => console.log(err))
        .finally(() => controller.abort());

}, []);

return (
   <>
    <h2>Listado de monstruos</h2>
    <ul>
        {
          monsters.map((monster) => (
            <li key={monster.index}>
              <p>Nombre: {monster.name}</p>
              <p>URL del monstruo: {monster.url}</p>
             
            </li>
          ))
        }
      </ul>
  </>
  );
}

export default ListMonsters;


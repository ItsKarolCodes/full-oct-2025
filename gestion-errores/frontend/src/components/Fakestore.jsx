import { useState, useEffect } from "react";

function Fakestore() {

const [stores, setStores] = useState([]);

useEffect(() => {
    
    let controller = new AbortController();
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        signal: controller.signal
    };

    fetch('https://fakestoreapi.com/products', options)
        .then((res) => res.json())
        .then((data) => setStores(data))
        .catch((err) => console.log(err))
        .finally(() => controller.abort());

}, []);

return (
  <>
    <h2>Listado de productos</h2>
    <ul>
      {
        stores.map((store) => (
          <li key={store.id}>
            <img 
            src={store.image}
            alt={store.title}
            style={{width:"150px", marginBottom: "10px"}}
            />
    
            <p>ID: {store.id}</p>
            <p>Producto: {store.title}</p>
            <p>Precio: {store.price}</p>
            <p>Descripcion: {store.description}</p>
            <p>Categoria: {store.category}</p>
            <p></p>
          </li>
        ))
      }
    </ul>
  </>
  );
}

export default Fakestore;


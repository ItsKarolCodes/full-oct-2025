import { useEffect, useState } from "react";

//accedemos a las variables de entorno
const { VITE_APIKEY } = import.meta.env 
const {VITE_APIURL} = import.meta.env





const Clima = () => {
  //declaramos los estados
  const [climaData, setClimaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [city, setCity] = useState("Madrid"); 

//manejamos el formulario
function submitHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const ciudad = formData.get("city");
  setCity(ciudad);
}
//llamada de API
useEffect(() => {
  //verificamos la construccion de la url
  if(!city || !VITE_APIKEY || !VITE_APIURL){
    setError(true);
    setLoading(false);
    return;
  }
  //construccion dinamica de la url
  const url = `${VITE_APIURL}?q=${city}&appid=${VITE_APIKEY}&units=metric&lang=es`;

  const controller = new AbortController();
  setLoading(true);
  setError(false);
  setClimaData(null);

  fetch(url, 
    {signal: controller.signal})
  .then((response) => response.json())
  .then((data) => {
    setLoading(false);
    setClimaData(data);
  })
  .catch((error) => {
    if(error.name === "AbortError") return;
    setError(true);
  });
  
  return () => { 
            controller.abort();
        };
    }, [city]);

return (
  <>
  <form onSubmit={submitHandler}>
    <div className="form-group">
      <input type= "text" name="city" placeholder="Ciudad" className="form-control"/>
      <button className="btn" type="submit">Buscar</button>
    </div>
  </form>
  {error || !climaData || climaData.cod !== 200? (
    <div>Error al cargar los datos del clima</div> 
  ) : loading ? (
    <span>Cargando datos del clima</span>
  ) : (
    <>
      <div>
        <h2>Clima en {climaData.name}</h2>
        <p>Temperatura: {climaData.main.temp}ºC</p>
        <p>Descripcion: {climaData.weather[0].description}</p>
        <p>Humedad: {climaData.main.humidity} %</p>
        <p>Viento: {climaData.wind.speed}m/s</p>
      </div>
    </>
  )}
 </>
)
};
export default Clima;

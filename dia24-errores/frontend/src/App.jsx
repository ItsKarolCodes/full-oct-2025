import { RouterProvider } from "react-router-dom";
import { router } from "./routers/routers.jsx";
import "./App.css";

function App() {
  return (
    <>
      <h1>Dia 24 - Backend</h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

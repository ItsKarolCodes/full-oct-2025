import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Fakestore from './components/Fakestore';
import ListMonsters from './components/ListMonsters';
import ListUsers from './components/ListUsers';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <div className='page'>
        <h1>PETICIONES</h1>

        {/* Navegación */}
        <nav>
          <ul>
            <li><Link to="/fakestore">FakeStore</Link></li>
            <li><Link to="/monsters">Monstruos</Link></li>
            <li><Link to="/users">Usuarios</Link></li>
          </ul>
        </nav>

       
        <Routes>
          <Route path="/fakestore" element={<Fakestore />} />
          <Route path="/monsters" element={<ListMonsters />} />
          <Route path="/users" element={<ListUsers />} />

         
          <Route path="/" element={<h2>Selecciona una API del menú</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
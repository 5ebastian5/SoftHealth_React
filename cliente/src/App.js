import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Componentes/Home.js';
import Login from './Componentes/Login.js';
import ForgotPassword from './Componentes/ForgotPassword';
import ResetPassword from './Componentes/ResetPassword';
import Profile from './Componentes/Profile.js';
import RegisterA from './Componentes/administrador/RegisterA.js';
import RegisterM from './Componentes/medico/RegisterM.js';
import RegisterP from './Componentes/paciente/RegisterP.js';
import HomeA from './Componentes/administrador/HomeA.js';
import ReadA from './Componentes/administrador/ReadA.js'
import ReadM from './Componentes/medico/ReadM.js'
import HomeM from './Componentes/medico/HomeM.js'
import HomeP from './Componentes/paciente/HomeP.js';
import ReadP from './Componentes/paciente/ReadP.js'
import BuscarHC from './Componentes/historial-clinico/BuscarHC.js';
import CPClinico from './Componentes/historial-clinico/CPClinico.js'
import RegPClinico from './Componentes/historial-clinico/RegPClinico.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/administrador/register" element={<RegisterA />} />
          <Route path="/administrador/register/:documento" element={<RegisterA />} />
          <Route path="/administrador/home" element={<HomeA/>}/>
          <Route path='/administrador/listaradmin' element={<ReadA/>}/>
          <Route path="/medico/register" element={<RegisterM />} />
          <Route path="/medico/register/:documento" element={<RegisterM />} />
          <Route path="/medico/home" element={<HomeM/>}/>
          <Route path="/crear-historia" element={<CPClinico />} />
          <Route path="/buscar-historia" element={<BuscarHC />} />
          <Route path="/procesos" element={<RegPClinico />} />
          <Route path="/medico/listarmedico" element={<ReadM/>}/>
          <Route path="/paciente/register" element={<RegisterP />} />
          <Route path="/paciente/register/:documento" element={<RegisterP />} />
          <Route path="/paciente/home" element={<HomeP/>}/>
          <Route path="/paciente/listarpaciente" element={<ReadP/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

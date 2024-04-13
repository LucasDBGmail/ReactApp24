import React from "react";
 import {  useSession } from "@inrupt/solid-ui-react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
 
 
import { handleIncomingRedirect, EVENTS } from "@inrupt/solid-client-authn-browser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const authOptions = {
  clientName: "Solid Todo App",
};

const AuthenticatedRoutes = () => (
  <Routes>
     <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
  </Routes>
);

 
const UnauthenticatedRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
  </Routes>
);

function App() {
  const { session } = useSession();
 

   

  
  return (
    <div>    
       <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;




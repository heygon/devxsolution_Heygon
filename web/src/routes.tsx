import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Login from './pages/Login';
import RecuperarSenha from './pages/recuperarSenha';
import usuarios from './pages/usuarios';
import Landing from './pages/Landing';


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Landing } />
            <Route path="/cadastro" component={ Cadastro } />
            <Route path="/login" component={ Login } />
            <Route path="/recuperarSenha" component={ RecuperarSenha } />
            <Route path="/home" component={ Home } />
            <Route path="/usuarios" component={ usuarios } />
            
        </BrowserRouter>
    )
}
export default Routes;
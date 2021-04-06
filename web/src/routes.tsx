import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Landing from './pages/Landing';


function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={ Landing } />
            <Route path="/cadastro" component={ Cadastro } />
            <Route path="/login" component={ Login } />
        </BrowserRouter>
    )
}
export default Routes;
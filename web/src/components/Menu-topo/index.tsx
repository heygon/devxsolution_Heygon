import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/devxlogo.jpg';

function MenuTopo(){

    let login = 0;
    let dados = {
        name : ''
    };
    if(localStorage.DadosDevx != undefined){
        dados = JSON.parse(localStorage.DadosDevx);
        if(dados != undefined){
            login = 1;
        }
    }

    return (
        <>    
            <div className="col s2">
                <img src={Logo} alt="Logo" className="col s12" />
            </div>
            <div className="col s7 center-align" >
                <h2>Products</h2>
            </div>
            <div className="col s3 right-align" style={{ marginTop:'35px' }}>

                {!login && (
                    <>
                        <Link to="/login">
                            <i className="fa fa-lock"></i>
                            Signin
                        </Link> / 
                        <Link to="/cadastro">
                            <i className="fa fa-user-plus"></i>
                            Signing up
                        </Link>
                    </>
                )}
                
                {login && (
                    <>
                        <div className="left">Bem vindo <strong>{ dados.name }</strong></div> 
                        <Link to="/sair" className="right">
                            <div className="col-12 p-4">
                            <i className="fa fa-power-off"></i> Sair
                            </div>
                        </Link>
                    </>
                )}


            </div>
         </>
    )
}
export default MenuTopo;

import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/devxlogo.jpg';

function MenuTopo(){
    return (
        <>    
            
            <div className="col s2">
                <img src={Logo} alt="Logo" className="col s12" />
            </div>
            <div className="col s7 center-align" >
                <h2>Produtos</h2>
            </div>
            <div className="col s3 right-align" style={{ marginTop:'35px' }}>
                <Link to="/login"><i className="fa fa-lock"></i> Login</Link> / <Link to="/cadastro"><i className="fa fa-user-plus"></i> Cadastro</Link>
            </div>

            

            {/* <Link to="/sair">
                <div className="col-12 p-4">
                <i className="fa fa-power-off"></i> Sair
                </div>
            </Link> */}

         </>
        
    )
}
export default MenuTopo;

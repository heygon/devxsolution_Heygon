import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import Logo from './../../assets/images/devxlogo.jpg';
import api from '../../services/api';

function Login() {

    const history = useHistory();

    const [login, setLogin]  = useState('');
    const [senha, setSenha] = useState('');

    function realizarLogin(){

        api.post('/users/login',{
            email: login,
            pass: senha,
        }).then((e) => {
            if(e.data.resp === 's' && e.data.Usuario.name !== undefined){
                localStorage.setItem('DadosCoodesh',JSON.stringify(e.data.Usuario));
                history.push("/home");
            }else{
                alert('Usuário não encontrado');
            }
        }).catch(() => {
            alert('Usuário não encontrado');
        })

    }

    
  return (
        <div className=" cardLogin row">
            
            <div className="cardl col s6 offset-s3">
                <div className="row">
                    <div className="col s6 center-align">
                        <img src={Logo} alt="Logo" style={{ marginTop : '80px', width : '60%', marginLeft : '15%' }}/>
                    </div>
                    <div className="col s6">
                        <h5 className="center-align" style={{ fontWeight : 'bold' }}>Login</h5>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">E-mail</strong>
                            <input type="text" className="form-control rounded" value={login} onChange={ (e) => { setLogin(e.target.value) } } />
                        </div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Senha</strong>
                            <input type="password" className="form-control rounded" value={senha} onChange={ (e) => { setSenha(e.target.value) } } />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue btn-lg" onClick={realizarLogin}>Entrar</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">
                            <Link to="/recuperarSenha" className="cursor-pointer col s5 p-0">
                                <strong>Recuperar senha</strong>
                            </Link>
                            <span className="col s3 center-align">OU</span> 
                            <Link to="/cadastro"  className="cursor-pointer right-align col s4 p-0">
                                <strong>Cadastre-se</strong>
                            </Link>
                        </div>
                        <div className="col s12">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Login;
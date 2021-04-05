import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/api';
import MenuTopo from '../../components/Menu-topo';
import tenis from './../../assets/images/03ae6483503639.5d3ee0165522c.jpg';

function Landing() {
    const history = useHistory();

    const [nome,  setNome]  = useState('');
    const [email, setEmail] = useState('');
    const [cpf,   setCPF]   = useState('');
    const [senha, setSenha] = useState('');

    function salvarCadastro(){
        console.log({
            nome,
            email,
            cpf,
            senha,
            perfil : 1
        });

        api.post('users',{
            nome,
            email,
            cpf,
            senha,
            perfil : 1
        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push("/");
        }).catch(() => {
            alert('Erro no Cadastro');
        })
    }


    return (
        <div className=" cardLogin row landing ">
            <div className="col s10 offset-s1 landingCard white" >
                <MenuTopo />
                
                <div className="col s12">&nbsp;</div>
                <div className="col s12">&nbsp;</div>

                <div className="col s3" >
                    <ul className="collection productMenu col s12">
                        <li className="collection-item">
                            Mizuno <i className="fa fa-angle-right right"></i>
                        </li>
                        <li className="collection-item">
                            Adidas <i className="fa fa-angle-right right"></i>
                        </li>
                        <li className="collection-item">
                            Olimpicus <i className="fa fa-angle-right right"></i>
                        </li>
                        <li className="collection-item">
                            Nike <i className="fa fa-angle-right right"></i>
                        </li>
                    </ul>
                </div>
                <div className="col s6">
                    <img src={tenis} alt="" className="col s12"/>
                </div>
                <div className="col s3" >
                    <div className="sizes center-align">
                        <div className="col s12"> <h3>Sizes</h3> </div>
                        <div className="col s3"> <div className="size">37</div> </div>
                        <div className="col s3"> <div className="size">38</div> </div>
                        <div className="col s3"> <div className="size">39</div> </div>
                        <div className="col s3"> <div className="size">40</div> </div>
                    </div>
                    
                    <div className="col s12">&nbsp;</div>
                    <div className="col s12">&nbsp;</div>

                    <div className="sizes center-align">
                        <div className="col s3"><strong>Price</strong></div>
                        <div className="col s5"></div>
                        <div className="col s4">$ 89,00 </div>
                    </div>

                    <div className="col s12">&nbsp;</div>
                    <div className="col s12">&nbsp;</div>

                    <div className="sizes center-align">
                        <div className="col s12"> <h5 className="left">Colors</h5> </div>
                        <div className="col s3"> <div className="size yellow"></div> </div>
                        <div className="col s3"> <div className="size red"></div> </div>
                        <div className="col s3"> <div className="size green"></div> </div>
                        <div className="col s3"> <div className="size blue"></div> </div>
                    </div>

                </div>



            </div>
            <div style={{ clear : 'both' }}>&nbsp;</div>
            <div style={{ clear : 'both' }}>&nbsp;</div>
            <div style={{ clear : 'both' }}>&nbsp;</div>
        </div>
  );
}

export default Landing;
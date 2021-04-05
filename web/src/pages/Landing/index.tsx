import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

import './style.css';
import api from '../../services/api';
import MenuTopo from '../../components/Menu-topo';
import tenis from './../../assets/images/03ae6483503639.5d3ee0165522c.jpg';

function Landing() {
    const history = useHistory();

    const [newName,  setnewName]  = useState(String);
    const [produtos,  setProdutos]  = useState([]);
    const [produtoVitrine,  setProdutoVitrine]  = useState({
        id     : String,
        name   : String,
        images : String,
        price  : String
    });
    

    const dados = JSON.parse(localStorage.DadosDevx);
    let login = 0;
    if(dados != undefined){
        login = 1;
    }

    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
    });

    function ListaProdutos(){
        api.get('products').then((e) => {
            if(e.data.resp === 's'){
                setProdutos(e.data.products);
                setProdutoVitrine({
                    id      : e.data.products[0]['id'],
                    name    : e.data.products[0]['name'],
                    images  : e.data.products[0]['images'],
                    price   : e.data.products[0]['price'],
                });
            }
        }).catch(() => {
            alert('Erro no Cadastro');
        })

    }

    function verDetalhesProduto(dados:any){
        
        console.log(dados);

        setProdutoVitrine({
            id      : dados.id,
            name    : dados.name,
            images  : dados.images,
            price   : dados.price,
        });

        return dados;
    }

    function editProduct(id: any) {
        console.log(id);

        return id;
    }

    function addNewProduct() {
        return true;
    }

    function registerNewProduct() {
        return true;
    }


    return (
        <>
            <div className=" cardLogin row landing " onLoad={ListaProdutos}>
                <div className="col s10 offset-s1 landingCard white" >
                    <MenuTopo />
                    
                    <div className="col s12">&nbsp;</div>
                    <div className="col s12">&nbsp;</div>

                    <div className="col s3" >
                        <ul className="collection productMenu col s12" >
                            {produtos.map(value => {
                                return (
                                    <>
                                        {console.log(value['id'])}
                                        {(value['id'] == produtoVitrine.id) && (
                                            <>
                                                <li className="collection-item activeItem" onClick={ (e) => { verDetalhesProduto(value) }} >
                                                    { value['name'] } <i className="fa fa-angle-right right"></i>
                                                </li>
                                            </>
                                        )}

                                        {(value['id'] != produtoVitrine.id) && (
                                            <li className="collection-item" onClick={ (e) => { verDetalhesProduto(value) }}>
                                                { value['name'] } <i className="fa fa-angle-right right"></i>
                                            </li>
                                        )}
                                    </>
                                )
                                
                            })}
                        </ul>
                    </div>
                    <div className="col s6">
                        {(produtoVitrine.images != undefined) && (
                            <img src={'http://localhost:3000/files/'+produtoVitrine.images} alt="" className="col s12"/>
                        )}

                        {login && (
                            <>
                                <div className="col s12">&nbsp;</div>
                                <div className="col s6">
                                    <div className="col s12 btn orange" onClick={ (e) => { editProduct(produtoVitrine.id) } }>Edit this product</div>
                                </div> 
                                <div className="col s6">
                                    <div className="col s12 btn grey modal-trigger" data-target="addNovoProduct">add new product</div>
                                </div> 
                            </>
                        )}
                        
                    </div>
                    <div className="col s3" >
                        <div className="col s12 center-align">
                            <h3>
                                <strong>
                                    {(produtoVitrine.name != undefined) && (
                                        produtoVitrine.name
                                    )}
                                </strong>
                            </h3>
                        </div>
                        <div className="sizes center-align">
                            <div className="col s12"> <h5>Sizes</h5> </div>
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
                            <div className="col s4">$ 
                                {(produtoVitrine.price != undefined) && (
                                    produtoVitrine.price
                                )}
                            </div>
                        </div>

                        <div className="col s12">&nbsp;</div>

                        <div className="sizes center-align">
                            <div className="col s12"> <h5 className="left-align col s12">Colors</h5> </div>
                            <div className="col s3"> <div className="size yellow"></div> </div>
                            <div className="col s3"> <div className="size red"></div> </div>
                            <div className="col s3"> <div className="size green"></div> </div>
                            <div className="col s3"> <div className="size blue"></div> </div>
                        </div>

                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">&nbsp;</div>

                        <div className="col s12">
                            <div className="col s12 btn blue">Buy</div>
                        </div>

                    </div>



                </div>
                <div style={{ clear : 'both' }}>&nbsp;</div>
                <div style={{ clear : 'both' }}>&nbsp;</div>
                <div style={{ clear : 'both' }}>&nbsp;</div>
            
            </div>

            <div id="addNovoProduct" className="modal bottom-sheet" style={{ minHeight : '100%' }}>
                <div className="modal-content row">
                    <div className="col s4 offset-s4">

                        <h4 className="col s12 center-align">
                            Add new product
                            <i className="fa fa-times modal-action modal-close right"></i>
                        </h4>

                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input type="file"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text"/>
                            </div>
                        </div>

                        <div className="col s12">&nbsp;</div>

                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Name</strong>
                            <input type="text" className="form-control rounded" value={newName} onChange={ (e) => { setnewName(e.target.value) } } />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Price</strong>
                            <input type="number" className="form-control rounded"  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Description</strong>
                            <input type="text" className="form-control rounded"  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue" onClick={registerNewProduct}>Add</div>

                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default Landing;


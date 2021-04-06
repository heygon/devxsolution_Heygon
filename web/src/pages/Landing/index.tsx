import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

import './style.css';
import api from '../../services/api';
import MenuTopo from '../../components/Menu-topo';
import tenis from './../../assets/images/03ae6483503639.5d3ee0165522c.jpg';

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});

function Landing() {
    const history = useHistory();

    const [newName,  setnewName]              = useState(String);
    const [newPrice, setnewPrice]             = useState(String);
    const [newFile, setnewFile]               = useState(String);
    const [newFileE, setnewFileE]               = useState(String);
    const [newDescription, setnewdescription] = useState(String);
    const [firstImage, setfirstImage]         = useState(false);
    const [produtos,  setProdutos]            = useState([]);
    
    


    const [produtoVitrine,  setProdutoVitrine]  = useState({
        id     : String,
        name   : String,
        images : String,
        price  : String
    });
    

    let login = 0;
    if(localStorage.DadosDevx != undefined){
        const dados = JSON.parse(localStorage.DadosDevx);
        if(dados != undefined){
            login = 1;
        }
    }


    function ListaProdutos(){
        api.get('products').then((e) => {
            if(e.data.resp === 's'){
                setProdutos(e.data.products);

                //console.log(produtoVitrine.id());

                if(!firstImage){

                    setProdutoVitrine({
                        id      : e.data.products[0]['id'],
                        name    : e.data.products[0]['name'],
                        images  : e.data.products[0]['images'],
                        price   : e.data.products[0]['price'],
                    });
                    setfirstImage(true);
                }
            }
        })

    }

    
    function viewProduct(id: any) {
        console.log(id);

        api.get('products/'+id)
        .then(response => {

            console.log(response.data.product);
            setnewName(response.data.product.name);
            setnewPrice(response.data.product.price);
            //setnewFile(response.data.product.images);
            setnewdescription(response.data.product.description);

        });

        return id;
    }


    function saveEditProduct() {
        let dados = JSON.parse(localStorage.DadosDevx);
        api.put('products/'+produtoVitrine.id,{
            name: newName,
            description: newDescription,
            price: newPrice,
            images: newFileE,
            status: 1,
            Token: dados.token,
        })
        .then(response => {

            if(response.data.resp == 's'){
                setnewName('');
                setnewPrice('');
                setnewFile('');
                setnewdescription('');

                window.location.reload();
            }            

        });
        
        
        return true;
    }


    function onLoadNewFile(e:any){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            //console.log(e.target!.result);
            let fil = (e.target!.result == null) ? '' : e.target!.result as string;
            setnewFile(fil);
        }
    }


    function onLoadNewFileE(e:any){
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            //console.log(e.target!.result);
            let fil = (e.target!.result == null) ? '' : e.target!.result as string;
            setnewFileE(fil);
        }
    }


    function registerNewProduct() {
        console.log('iniciando o cadastro');

        let dados = JSON.parse(localStorage.DadosDevx);

        api.post("products", {
            name : newName,
            price : newPrice,
            description : newDescription,
            images : newFile,
            status : '1',
            Token : dados.token
        }).then(response => {
            if(response.data.resp == 's'){
                setnewName('');
                setnewPrice('');
                setnewFile('');
                setnewdescription('');

                window.location.reload();
            }
        });

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
                                                <li id={value['id']} className="collection-item activeItem" onClick={ (e) => { setProdutoVitrine({
                                                                                                                id      : value['id'],
                                                                                                                name    : value['name'],
                                                                                                                images  : value['images'],
                                                                                                                price   : value['price'],
                                                                                                            }); }} >
                                                    { value['name'] } <i className="fa fa-angle-right right"></i>
                                                </li>
                                            </>
                                        )}

                                        {(value['id'] != produtoVitrine.id) && (
                                            <li id={value['id']} className="collection-item" onClick={ (e) => { setProdutoVitrine({
                                                id      : value['id'],
                                                name    : value['name'],
                                                images  : value['images'],
                                                price   : value['price'],
                                            }); }}>
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
                            <img src={''+produtoVitrine.images} alt="" className="col s12"/>
                        )}

                        {login && (
                            <>
                                <div className="col s12">&nbsp;</div>
                                {(produtoVitrine.images != undefined) && (
                                    <div className="col s6">
                                        <div className="col s12 btn orange modal-trigger" data-target="editProduct" onClick={ (e) => { viewProduct(produtoVitrine.id) } }>Edit this product</div>
                                    </div> 
                                )}
                                
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
                                <input id="newFile" type="file" onChange={ (e) => onLoadNewFile(e)}/>
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
                            <input type="number" className="form-control rounded" value={newPrice} onChange={ (e) => { setnewPrice(e.target.value) } }  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Description</strong>
                            <input type="text" className="form-control rounded" value={newDescription} onChange={ (e) => { setnewdescription(e.target.value) } }  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue" onClick={registerNewProduct}>Add</div>

                    </div>
                    
                </div>
            </div>

            <div id="editProduct" className="modal bottom-sheet" style={{ minHeight : '100%' }}>
                <div className="modal-content row">
                    <div className="col s4 offset-s4">

                        <h4 className="col s12 center-align">
                            Edit the product { newName }
                            <i className="fa fa-times modal-action modal-close right"></i>
                        </h4>

                        <div className="col s12">&nbsp;</div>
                        <div className="col s12">&nbsp;</div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>File</span>
                                <input id="newFileEdit" type="file" onChange={ (e) => onLoadNewFileE(e)}  value={newFile}/>
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
                            <input type="number" className="form-control rounded" value={newPrice} onChange={ (e) => { setnewPrice(e.target.value) } }  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="input-group input-group-lg mb-3">
                            <strong className="col s12">Description</strong>
                            <input type="text" className="form-control rounded" value={newDescription} onChange={ (e) => { setnewdescription(e.target.value) } }  />
                        </div>
                        <div className="col s12">&nbsp;</div>
                        <div className="col s12 btn blue" onClick={saveEditProduct}>Save</div>

                    </div>
                    
                </div>
            </div>
            
        </>
    );
}

export default Landing;


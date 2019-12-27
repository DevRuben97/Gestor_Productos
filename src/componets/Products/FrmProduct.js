import React, { useState } from 'react';


//Functions
import {GenerateRandonCode} from '../../helpers/Generic';


export default function FrmProduct({IsEdit, Data}){
    
    //States:
    const [Id, SetProductId]= useState(0);
    const [Name, SetProductName]= useState('');
    const [Code, SetCode]= useState(GenerateRandonCode(8))
    const [Description, SetProductDescription]= useState('');
    const [Price, SetPrice]= useState(0.00);
    const [Cost, SetCost]= useState(0.00);
    const [Stock, SetStock]= useState(0);
    const [Taxed, SetTaxed]= useState(false);
    const [Category, setCategory]= useState('');
    const [Provider, SetProvide]= useState('');
    const [State, SetState]= useState(1);



    //Constantes:
    const Tilte= IsEdit? 'Editar Producto': 'Nuevo Producto'
    const BtnLabel= IsEdit? 'Editar Producto': 'Crear Producto'

    async function SaveProduct(e){
        e.preventDefault();
        alert('hola');
    }
    return (
        <form>
            <div className="container">
            <h2 className="text-center">{Tilte}</h2>
                    <div className="row">
                        <div className="col-md-5">
                            <label>Nombre</label>
                            <input type="text" className="form-control" placeholder="introduce el Nombre del Producto" onChange= {(e)=> SetProductName(e.target.value)}></input>
                        </div>
                        <div className="col-md-5">
                        <label>Codigo del Producto</label>
                            <input type="number" value={Code} className="form-control-plaintext" readOnly></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                        <label>Precio</label>
                            <input type="number" className="form-control" placeholder="$0.00" onChange={e=> SetPrice(e.target.value)}></input>
                            <br/>
                        </div>
                        <div className="col-md-5">
                        <label>Costo</label>
                            <input type="number" className="form-control" placeholder="$0.00" onChange={e=> SetCost(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1"></input>
                            <label class="custom-control-label" for="customCheck1" onChange={e=> SetTaxed(e.target.value)}>Producto Gravable</label>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label>Stock Inicial</label>
                            <input type="number" className="form-control" onChange={e=> SetStock(e.target.value)} placeholder="Introduce el Stock Inicial"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <label>Categoria</label>
                            <input type="text" className="form-control" onChange={e=> setCategory(e.target.value)} placeholder="Categoria"></input>
                        </div>
                        <div className="col-md-5">
                            <label>Proveedor</label>
                            <input type="text" className="form-control" onChange={e=> SetProvide(e.target.value)} placeholder="Categoria"></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label>Description</label>
                            <textarea className="form-control" rows="4" onChange={e=> SetProductDescription(e.target.value)}></textarea>
                            <br/>
                            <button className="btn btn-primary btn-lg btn-block" onClick= {SaveProduct}>{BtnLabel}</button>
                        </div>
                    </div>
                </div>
        </form>
    )
}
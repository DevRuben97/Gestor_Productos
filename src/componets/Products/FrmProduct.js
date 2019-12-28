import React, { useState } from 'react';
import {Formik, ErrorMessage} from 'formik';


//Librelies
import Swal from 'sweetalert2';

//Functions
import {GenerateRandonCode} from '../../helpers/Generic';
import {NewProduct, EditProduct} from '../../http/Products';


export default function FrmProduct({IsEdit, Data, SetOpenModal}){
    
    //States:
    //Products Variables:
   const [Product, SetProduct]= useState({
    id: 0,
    Name: '',
    Code: GenerateRandonCode(8),
    Description: '',
    Price: 0.00,
    Cost: 0.00,
    Stock: 0,
    Taxed: false,
    Category: '',
    Provider: '',
    State: 1
   })

    //Constantes:
    const Tilte= IsEdit? 'Editar Producto': 'Nuevo Producto'
    const BtnLabel= IsEdit? 'Editar Producto': 'Crear Producto'

    async function SaveProduct(values){

        try {
            let Result;
            if (!IsEdit) {
              Result = await NewProduct(values);
            } else {
              Result = await EditProduct(values);
            }

            if (Result.status === 201) {
              Swal.fire({
                title: IsEdit ? "Editar Producto" : "Nuevo Producto",
                text: IsEdit
                  ? "El Producto fue editado correctamente"
                  : "El Producto fue creado correctamente",
                icon: "success"
              }).then(() => {
                SetOpenModal(false);
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Ha ocurrido un error inesperado",
                icon: "error"
              });
            }
        } 
        catch (error) {
         console.log(error);   
        }

    }
    return (
        <div className="container">
            <Formik
            initialValues= {Product}
            onSubmit={async (values)=> await SaveProduct(values)}
            validateOnBlur= {true}
            validate={(values)=>{
                const errors= {}

                if (!values.Name){
                    errors.Name= 'El nombre es requerido'
                }
                else if (!values.Price){
                    errors.Price= 'El Precio es requerido'
                }
                else if (!values.Cost){
                    errors.Cost= "El Costo el requerido"
                }
                else if (!values.Category){
                    errors.Category= "La Categoria es requerida"
                }
                else if (!values.Provider){
                    errors.Provider= "El Proveedor es requerido"
                }
                
                return errors;
            }}
            >
            {({handleSubmit, handleChange,values,errors})=>(
               <form onSubmit={handleSubmit}>
                    <h2 className="text-center">{Tilte}</h2>
                <div className="row">
                    <div className="col-md-5">
                        <label>Nombre</label>
                        <input type="text" className="form-control" placeholder="Introduce el Nombre del Producto" value={values.Name} name='Name' onChange= {handleChange}></input>
                        <label className="ValidatetionError">{errors.Name}</label>
                    </div>
                    <div className="col-md-5">
                    <label>Codigo del Producto</label>
                        <input type="number" value={values.Code} className="form-control-plaintext" readOnly></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                    <label>Precio</label>
                        <input type="number" className="form-control" placeholder="$0.00" value={values.Price} name='Price' onChange={handleChange}></input>
                        <label className="ValidatetionError">{errors.Price}</label>
                        <br/>
                    </div>
                    <div className="col-md-5">
                    <label>Costo</label>
                        <input type="number" className="form-control" placeholder="$0.00" value={values.Cost} name='Cost' onChange={handleChange}></input>
                        <label className="ValidatetionError">{errors.Cost}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" checked={values.Taxed} name='Taxed' onChange={handleChange}></input>
                        <label class="custom-control-label" for="customCheck1" >Producto Gravable</label>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label>Stock Inicial</label>
                        <input type="number" className="form-control" value={values.Stock} onChange={handleChange} name='Stock' placeholder="Introduce el Stock Inicial"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <label>Categoria</label>
                        <input type="text" className="form-control" value={values.Category} onChange={handleChange} name='Category' placeholder="Categoria"></input>
                        <label className="ValidatetionError">{errors.Category}</label>
                    </div>
                    <div className="col-md-5">
                        <label>Proveedor</label>
                        <input type="text" className="form-control" value={values.Provider} onChange={handleChange} name='Provider' placeholder="Categoria"></input>
                        <label className="ValidatetionError">{errors.Provider}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Description</label>
                        <textarea className="form-control" rows="4" value={values.Description} onChange={handleChange} name='Description'></textarea>
                        <br/>
                        <button className="btn btn-primary btn-lg btn-block" type="submit"
                        disabled={values.Name==='' || values.Price=== 0 || values.Cost=== 0 || values.Category=== '' || values.Provider=== ''}
                        
                        >{BtnLabel}</button>
                    </div>
                </div>
               </form>
            )}    
            
            </Formik>
        </div>
    )
}
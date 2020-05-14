import React, { Fragment, useState, useEffect } from 'react';
import {Formik} from 'formik';

import Select from 'react-select';

import Table from '../Table';


import {productsForSelect} from '../../http/Products'

export default function MovementDetails({setDetails}){

    const [initialValues,setInitialValues]= useState({
        product_id: 0,
        quantity: 0   
    })
    const [array, setArray]= useState([]);
    const [productsSelect, setProductsSelect]= useState([]);


    useEffect(()=> {
      async function Fetch(){
        const {data}= await productsForSelect();
        console.log(data);
        setProductsSelect(data.Data);
      }
      Fetch();
    },[])

    function get_productInfo(id){

    }

    function insert(value){
        console.log(value)
    }

    return (

        <Fragment>
             <h2 className="text-center">Detalle del movimiento</h2>
             <Formik
             initialValues={initialValues}
             enableReinitialize={true}
             validateOnBlur={true}
             onSubmit={values=> insert(values)}
             >
                 {({handleChange, handleSubmit,setFieldValue, values,errors})=> (
                    <form onSubmit={handleSubmit}>
                        <div className="container">
                            <div style={{width: '40%'}}>
                                 <Select
                                 placeholder="Seleccione el producto"
                                 noOptionsMessage={()=> "No hay productos"}
                                 options={productsSelect}
                                 onChange={(selected)=> {
                                  setFieldValue('product_id', selected.value);
                                  get_productInfo(selected.value)
                                 }}
                                 />
                            </div>
                            <br/>
                            <div className="row">
                              <div className="col-sm-5">
                              <label>Precio del Producto</label>
                                <input type="text" className="form-control" disabled/>
                              </div>
                              <div className="col-sm-2">
                              <label>Stock Actual</label>
                                <input type="number" className="form-control" disabled/>
                              </div>
                              <div className="col-sm-2">
                              <label>Introduce la cantidad</label>
                                <input type="number" className="form-control" onChange={handleChange('quantity')} />
                              </div>
                              <div className="col-sm-2">
                                <input type="submit" className="btn btn-primary" value="Agregar" style={{marginTop: '30px'}} />
                              </div>
                            </div>
                            <div className="row" style={{marginTop: "20px"}}>
                                <Table
                                Titles={["Producto", "Precio", "Stock", "Cantidad", "SubTotal", "Acción"]}
                                Body={array.map((item,index)=> (
                                  <tr>
                                    <th>{item.price}</th>
                                    <th>{item.price}</th>
                                    <th>{item.stock}</th>
                                    <th>{item.quantity}</th>
                                    <th>{(item.price * item.quantity)}</th>
                                    <th>
                                      <a className="btn btn-secondary" href="#" data-tip="Eliminar producto">
                                      <i class="fas fa-trash-alt"></i>
                                      </a>
                                    </th>
                                  </tr>
                                ))}
                                />
                            </div>
                        </div>
                    </form>
                 )}
             </Formik>
        </Fragment>
    )
}
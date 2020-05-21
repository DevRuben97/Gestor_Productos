import React, { useState, useEffect } from 'react';
import {Formik} from 'formik';
import Select from 'react-select';

import MovementDetails from '../componets/Movements/MovementDetails';

import {getMovementTypes} from '../http/Movements';

export default function FrmMovement({history}){

    const [initialValues, setValues]= useState({
        date: null,
        invoice: 0,
        Amount: 0,
        type: '',
        comments: null,
        details: []
    })
    const [MovementTypes, setMovementTypes]= useState([]);
    //const isEdit= history.state.isEdit;
    //const title= isEdit? "Agregar Movimiento": "Editar Movimiento"

    useEffect(()=> {
        async function Fetch(){
            const {data}= await getMovementTypes();
            setMovementTypes(data.Data);
        }
        Fetch();
    },[])

    function save(values){
        alert('test');
        console.log(values);
    }

    return (
        <div className="container">
            <br />
            <h2 className="text-center">Registrar Movimiento</h2>
            <p>Registre los movimientos de una serie de productos. Los campos marcados con (*) son requeridos</p>
            <Formik
            initialValues={initialValues}
            onSubmit={(values)=> save(values)}
            validateOnBlur={true}
            enableReinitialize={true}
            >
            {({handleSubmit, handleChange, setFieldValue,values})=> (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-5">
                            <label><strong>Fecha*: </strong></label>
                            <input type="date" className="form-control" onChange={handleChange('date')}/>
                        </div>
                        <div className="col-md-3">
                            <label><strong>Numero de la Factura *:</strong></label>
                            <input type="text" className="form-control" onChange={handleChange('invoice')} placeholder="#0000000"/>
                        </div>
                        <div className="col-md-3">
                            <label><strong>Tipo*: </strong></label>
                            <Select
                            placeholder="Seleccione"
                            options={MovementTypes}
                            onChange={(selected)=> setFieldValue('type', selected.value)}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                    <label><strong>Comentarios Adicionales: </strong></label>
                    <textarea className="form-control" onChange={handleChange('comments')} rows={5}/>
                    </div>
                    <br/>
                    <MovementDetails
                    Details={values.details}
                    setDetails={(value)=> setFieldValue('details',value)}
                    error={true}
                    /> 
                    <div className="row" style={{marginTop: '15px', marginLeft: '10px'}}>
                        <button className="btn btn-primary btn-lg"  type="submit"><i class="fas fa-check"></i> Guardar Cambios</button>
                    </div>
                </form>

            )}
            </Formik>

        </div>
    )

}
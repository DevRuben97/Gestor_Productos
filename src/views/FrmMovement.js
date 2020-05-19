import React, { useState } from 'react';
import {Formik} from 'formik';

import Swal from 'sweetalert2';

import MovementDetails from '../componets/Movements/MovementDetails';

export default function FrmMovement({history}){

    const [initialValues, setValues]= useState({
        date: null,
        invoice: 0,
        Amount: 0,
        comments: null,
        details: []
    })
    //const isEdit= history.state.isEdit;
    //const title= isEdit? "Agregar Movimiento": "Editar Movimiento"

    function save(values){
        alert('test');
    }

    return (
        <div className="container">
            <br />
            <h2 className="text-center">Registrar Movimiento</h2>
            <p>Registre los movimientos de una serie de productos</p>
            <Formik
            initialValues={initialValues}
            onSubmit={(values)=> save(values)}
            validateOnBlur={true}
            enableReinitialize={true}
            >
            {({handleSubmit, handleChange, setFieldValue,values,errors})=> (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-5">
                            <label><strong>Fecha: </strong></label>
                            <input type="date" className="form-control" onChange={handleChange('date')}/>
                        </div>
                        <div className="col-md-5">
                            <label><strong>Numero de la Factura: </strong></label>
                            <input type="text" className="form-control" onChange={handleChange('invoice')} placeholder="#0000000"/>
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
import React, { Fragment, useState, useEffect } from 'react';

//Libreries:
import {withRouter} from 'react-router-dom'

//Componets:
import Table from "../componets/Table";
import { Spinner } from "react-activity";
import "react-activity/dist/react-activity.css";
import ReactTooltip from "react-tooltip";

//Data functions:
import {getMovements} from '../http/Movements';

let numeral = require('numeral');


 function ProductMovements({history}){

    const [Movements, SetMovements] = useState([]);
    const [Filter, setFilter] = useState([]);
    const [IsLoanding, SetLoanding] = useState(false);


  useEffect(()=>{
    FechData();
  },[])


  async function FechData(){
    SetLoanding(true);
    const {data}= await getMovements();
    SetMovements(data.Data);
    setFilter(data.Data);
    SetLoanding(false);
  }


    function SetTable() {
        if (IsLoanding) {
          return (
            <div className="container" style={{ width: "5%" }}>
              <Spinner color="#727981" size={32} speed={1} animating={true} />
            </div>
          );
        } else {
          if (Filter.length === 0) {
            return <p className="text-center">No hay registros para mostrar</p>;
          } else {
            return (
              <div>
                <Table
                  Titles={[
                    "#Factura",
                    "Fecha",
                    "Monto",
                    "Comentarios",
                    "Usuario Creador",
                    "Tipo",
                    "Acciones"
                  ]}
                  Body={Filter.map((item, index) => (
                    <tr key={index}>
                      <th>{item.Invoice}</th>
                      <th>{item.Date}</th>
                      <th>${numeral(item.Amount).format(0, 0)}</th>
                      <th>{item.Comments}</th>
                      <th>{item.UserFullName}</th>
                      <th>{item.TypeLabel}</th>
                      <th>
                        <button
                          data-tip="Editar el Movimiento"
                          className="btn btn-secondary"
                          onClick={() => {
                            history.push('/AddMovement', {
                              id: item.Id,
                              isEdit: true
                            })
                          }}
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button
                          data-tip="Cambiar el estado"
                          className="btn btn-danger"
                          href="#"
                        >
                          <i class="fas fa-trash-alt"></i>
                        </button>
                      </th>
                    </tr>
                  ))}
                />
                <ReactTooltip />
              </div>
            );
          }
        }
      }

    return (
        <Fragment>
        <div className="container">
        <h2 className="text-center"><i class="fas fa-exchange-alt"></i> Movimientos de Productos</h2>
          <div className="row">
            <div className="col-md-9">
              <label>Buscar Movimientos</label>
              <input
                type="text"
                className="form-control"
                style={{ width: "50%" }}
                placeholder="Buscar por Nombre"
                //onChange={e => FilterMovements(e.target.value)}
              ></input>
            </div>
            <div className="col-md-3">
              <br />
              <button
                className="btn btn-primary"
                onClick={() => history.push('/AddMovement')}
                style={{ position: "relative" }}
              >
                <i className="fas fa-plus"></i> Nuevo Movimiento
              </button>
            </div>
          </div>
          <br />
          <div className="card">
            <div className="card-body">{SetTable()}</div>
          </div>
        </div>
      </Fragment>
    )
}

export default withRouter(ProductMovements);
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Select from "react-select";
import {withRouter} from 'react-router-dom';

import MovementDetails from "../componets/Movements/MovementDetails";
import { MOVEMENT_SCHEME } from "../helpers/formValidations";
import { message } from "../helpers/alerts";

import { 
  getMovementTypes,
  newMovement,
  getMovementById
   }
    from "../http/Movements";

function FrmMovement({ history }) {
  const [initialValues, setValues] = useState({
    Id: 0,
    Date: null,
    Invoice: "",
    Amount: 0,
    Type: "",
    Comments: "",
    Details: [],
  });
  const [MovementTypes, setMovementTypes] = useState([]);
  const [IsLoading, setLoading] = useState(false);
  console.log(history);
  const isEdit= history.location.state?.isEdit;
  const movementId= history.location.state?.id;
  const title= (isEdit)? "Editar Movimiento": "Agregar Movimiento"

  useEffect(() => {
    async function Fetch() {
      const { data } = await getMovementTypes();
      setMovementTypes(data.Data);
      if (isEdit){
        GetMovement();
      }
    }
    Fetch();
  }, []);

  async function GetMovement(){
    const {data}= await getMovementById(movementId);
    setValues(data.Data);
  }

  async function save(values) {
    console.log(values);
    setLoading(true);
    try {
      const { data } = await newMovement(values);
      console.log(data);
      const success = data.OperationSuccess;
      if (success) {
        message(data.Message, "success");
      } else {
        message(data.Message, "warning");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="container">
      <br />
      <h2 className="text-center">{title}</h2>
      <p>
        Registre los movimientos de una serie de productos. Los campos marcados
        con (*) son requeridos
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await save(values)}
        enableReinitialize
        validateOnChange
        validationSchema={MOVEMENT_SCHEME}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          touched,
          values,
          errors,
          isValid,
        }) => (
          <form
            onSubmit={(event) => {
              handleSubmit(event);
              if (!isValid) {
                message("Aún tiene campos requeridos por llenar.", "warning");
              }
            }}
          >
            <div className="row">
              <div className="col-md-5">
                <label
                  style={{
                    color: errors.Date && touched.Date ? "red" : "black",
                  }}
                >
                  <strong>Fecha*: </strong>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleChange("Date")}
                  value={values.Date}
                />
                {touched.Date && (
                  <label style={{ color: "red" }}>{errors.Date}</label>
                )}
              </div>
              <div className="col-md-3">
                <label
                  style={{
                    color: errors.Invoice && touched.Invoice ? "red" : "black",
                  }}
                >
                  <strong>Numero de la Factura *:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange("Invoice")}
                  placeholder="#0000000"
                  value={values.Invoice}
                />
                {touched.Invoice && (
                  <label style={{ color: "red" }}>{errors.Invoice}</label>
                )}
              </div>
              <div className="col-md-3">
                <label
                  style={{
                    color: errors.Type && touched.Type ? "red" : "black",
                  }}
                >
                  <strong>Tipo*: </strong>
                </label>
                <Select
                  placeholder="Seleccione"
                  options={MovementTypes}
                  onChange={(selected) => setFieldValue("Type", selected.value)}
                  value={MovementTypes.filter((s) => s.value === values.Type)}
                />
                {touched.Type && (
                  <label style={{ color: "red" }}>{errors.Type}</label>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <label>
                <strong>Comentarios Adicionales: </strong>
              </label>
              <textarea
                className="form-control"
                onChange={handleChange("Comments")}
                rows={5}
                value={values.Comments}
              />
            </div>
            <br />
            <MovementDetails
              Details={values.Details}
              setDetails={(value) => setFieldValue("Details", value)}
              setTotal={(value) => setFieldValue("Amount", value)}
              error={errors.Details && touched.Details ? true : false}
              errorMessage={touched.Details ? errors.Details : undefined}
            />
            <div
              className="row"
              style={{ marginTop: "15px", marginLeft: "10px" }}
            >
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                disabled={IsLoading}
              >
                <i class="fas fa-check"></i>{" "}
                {IsLoading ? "Enviando Datos.." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default withRouter(FrmMovement);
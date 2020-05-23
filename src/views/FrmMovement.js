import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Select from "react-select";

import MovementDetails from "../componets/Movements/MovementDetails";
import { MOVEMENT_SCHEME } from "../helpers/formValidations";
import { alert } from "../helpers/alerts";
import { getMovementTypes, newMovement } from "../http/Movements";

export default function FrmMovement({ history }) {
  const [initialValues, setValues] = useState({
    Id: 0,
    Date: null,
    Invoice: null,
    Amount: 0,
    Type: "",
    Comments: null,
    Details: [],
  });
  const [MovementTypes, setMovementTypes] = useState([]);
  //const isEdit= history.state.isEdit;
  //const title= isEdit? "Agregar Movimiento": "Editar Movimiento"

  useEffect(() => {
    async function Fetch() {
      const { data } = await getMovementTypes();
      setMovementTypes(data.Data);
    }
    Fetch();
  }, []);

  async function save(values) {
    console.log(values);
    try {
      const { data } = await newMovement(values);
      console.log(data);
      const success = data.OperationSuccess;
      if (success) {
        alert(data.Message, "success");
      } else {
        alert(data.Message, "warning");
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="container">
      <br />
      <h2 className="text-center">Registrar Movimiento</h2>
      <p>
        Registre los movimientos de una serie de productos. Los campos marcados
        con (*) son requeridos
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => await save(values)}
        enableReinitialize
        validateOnBlur
        validationSchema={MOVEMENT_SCHEME}
      >
        {({ handleSubmit, handleChange, setFieldValue, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-5">
                <label style={{ color: errors.Date ? "red" : "black" }}>
                  <strong>Fecha*: </strong>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={handleChange("Date")}
                />
                <label style={{ color: "red" }}>{errors.Date}</label>
              </div>
              <div className="col-md-3">
                <label style={{ color: errors.Invoice ? "red" : "black" }}>
                  <strong>Numero de la Factura *:</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange("Invoice")}
                  placeholder="#0000000"
                />
                <label style={{ color: "red" }}>{errors.Invoice}</label>
              </div>
              <div className="col-md-3">
                <label style={{ color: errors.Type ? "red" : "black" }}>
                  <strong>Tipo*: </strong>
                </label>
                <Select
                  placeholder="Seleccione"
                  options={MovementTypes}
                  onChange={(selected) => setFieldValue("Type", selected.value)}
                />
                <label style={{ color: "red" }}>{errors.Type}</label>
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
              />
            </div>
            <br />
            <MovementDetails
              Details={values.Details}
              setDetails={(value) => setFieldValue("Details", value)}
              setTotal={(value) => setFieldValue("Amount", value)}
              error={errors.Details ? true : false}
              errorMessage={errors.Details}
            />
            <div
              className="row"
              style={{ marginTop: "15px", marginLeft: "10px" }}
            >
              <button className="btn btn-primary btn-lg" type="submit">
                <i class="fas fa-check"></i> Guardar Cambios
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

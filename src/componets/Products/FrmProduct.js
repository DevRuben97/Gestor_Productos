import React, { useState, useEffect } from "react";
import { Formik } from "formik";

//Librelies
import Swal from "sweetalert2";
import Modal from "react-responsive-modal";

//Functions
import { GenerateRandonCode } from "../../helpers/Generic";
import { NewProduct, GetProductById, EditProduct } from "../../http/Products";

//Validationss:
import { PRODUCT_SCHEMA } from "../../helpers/formValidations";

let numeral = require("numeral");

export default function FrmProduct({
  IsEdit,
  ProductId,
  SetOpenModal,
  open
}) {
  const intitValues = {
    Id: 0,
    Name: "",
    Code: GenerateRandonCode(8),
    Description: "",
    Price: 0.0,
    Cost: 0.0,
    Stock: 0,
    Taxed: false,
    Category: "",
    Provider: "",
    State: 0,
  };
  //States:
  //Products Variables:
  const [Product, SetProduct] = useState(intitValues);

  useEffect(() => {
    if (IsEdit && ProductId !== 0) {
      async function EditProduct() {
        try {
          const { data } = await GetProductById(ProductId);
          SetProduct(data.Data);
        } catch (error) {
          console.log(error);
        }
      }
      EditProduct();
    }
  }, [IsEdit]);

  //Constantes:
  const Tilte = IsEdit ? "Editar Producto" : "Nuevo Producto";
  const BtnLabel = IsEdit ? "Editar Producto" : "Crear Producto";

  async function SaveProduct(values) {
    try {
      let Result;
      if (!IsEdit) {
        Result = await NewProduct(values);
      } else {
        Result = await EditProduct(values);
      }

      const { data } = Result;
      if (data.OperationSuccess) {
        Swal.fire({
          title: IsEdit ? "Editar Producto" : "Nuevo Producto",
          text: IsEdit
            ? "El Producto fue editado correctamente"
            : "El Producto fue creado correctamente",
          icon: "success",
        }).then(() => {
          SetOpenModal(false);
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.Message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        SetOpenModal(false);
        SetProduct(intitValues);
      }}
      center={true}
      classNames={{ modal: "ModalContenedor" }}
    >
      <div className="container">
        <Formik
          initialValues={Product}
          onSubmit={async (values) => await SaveProduct(values)}
          validateOnBlur={true}
          enableReinitialize
          validationSchema={PRODUCT_SCHEMA}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <h2 className="text-center">{Tilte}</h2>
              <div className="row">
                <div className="col-md-5">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Introduce el Nombre del Producto"
                    value={values.Name}
                    name="Name"
                    onChange={handleChange}
                  ></input>
                  <label className="ValidatetionError">{errors.Name}</label>
                </div>
                <div className="col-md-5">
                  <label>Codigo del Producto</label>
                  <input
                    type="number"
                    value={values.Code}
                    className="form-control-plaintext"
                    readOnly
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label>Precio</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="$0.00"
                    value={numeral(values.Price).format(0, 0)}
                    name="Price"
                    onChange={handleChange}
                  ></input>
                  <label className="ValidatetionError">{errors.Price}</label>
                  <br />
                </div>
                <div className="col-md-5">
                  <label>Costo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="$0.00"
                    value={numeral(values.Cost).format(0, 0)}
                    name="Cost"
                    onChange={handleChange}
                  ></input>
                  <label className="ValidatetionError">{errors.Cost}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                      value={values.Taxed}
                      name="Taxed"
                      onChange={handleChange}
                    ></input>
                    <label class="custom-control-label" for="customCheck1">
                      Producto Gravable
                    </label>
                  </div>
                </div>
                <div className="col-md-5">
                  <label>Stock Inicial</label>
                  <input
                    type="number"
                    className="form-control"
                    value={values.Stock}
                    onChange={handleChange}
                    name="Stock"
                    placeholder="Introduce el Stock Inicial"
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label>Categoria</label>
                  <input
                    type="text"
                    className="form-control"
                    value={values.Category}
                    onChange={handleChange}
                    name="Category"
                    placeholder="Categoria"
                  ></input>
                  <label className="ValidatetionError">{errors.Category}</label>
                </div>
                <div className="col-md-5">
                  <label>Proveedor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={values.Provider}
                    onChange={handleChange}
                    name="Provider"
                    placeholder="Proveedor"
                  ></input>
                  <label className="ValidatetionError">{errors.Provider}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={values.Description}
                    onChange={handleChange}
                    name="Description"
                  ></textarea>
                  <br />
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    disabled={
                      values.Name === "" ||
                      values.Price === 0 ||
                      values.Cost === 0 ||
                      values.Category === "" ||
                      values.Provider === ""
                    }
                  >
                    {BtnLabel}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}

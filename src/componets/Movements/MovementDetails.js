import React, { Fragment, useState, useEffect } from "react";
import { Formik } from "formik";

import Select from "react-select";
import numeral from "numeral";
import { question } from "../../helpers/alerts";

import Table from "../Table";
import MovementTotals from "./MovementTotals";
import { message } from "../../helpers/alerts";

import { productsForSelect, GetProductById } from "../../http/Products";

export default function MovementDetails({
  Details,
  setDetails,
  setTotal,
  error,
  errorMessage,
  OpenProductModal
}) {
  const [initialValues, setInitialValues] = useState({
    Id: 0,
    Product_id: 0,
    Quantity: 0,
    Stock: 0,
    Price: 0,
    product_name: "",
  });
  const [array, setArray] = useState([]);
  const [productsSelect, setProductsSelect] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    async function Fetch() {
      const { data } = await productsForSelect();
      setProductsSelect(data.Data);
      if (Details && Details.length > 0) {
        console.log(Details);
        setArray(Details);
      }
    }
    Fetch();
  }, [Details]);

  async function get_productInfo(id) {
    const { data } = await GetProductById(id);
    console.log(data.Data);
    setSelectedProduct(data.Data);
  }

  function insert(value) {
    const newArray = [...array];
    const product_filter = newArray.filter(
      (item) => item.Product_id === SelectedProduct.Id
    );
    console.log(product_filter);
    if (product_filter.length > 0) {
      message(
        "El producto seleccionado ya se encuntra en la lista.",
        "warning"
      );
    } else {
      const object = {
        Price: numeral(SelectedProduct.Price).format(0, 0),
        Stock: SelectedProduct.Stock,
        product_name: SelectedProduct.Name,
        Quantity: value.Quantity,
        Product_id: SelectedProduct.Id,
        subTotal: numeral(SelectedProduct.Price).value() * value.Quantity,
      };
      newArray.push(object);
      setArray(newArray);
      setDetails(newArray);

      //reset form:
      setSelectedProduct({});
    }
  }

  async function deleteProduct(index) {
    const confirm = await question(
      "¿Esta seguro de eliminar este producto de la lista?"
    );

    if (confirm.value) {
      const newArray = [...array];
      newArray.splice(index);
      setArray(newArray);
      setDetails(newArray);
    }
  }

  return (
    <Fragment>
      <div>
        <h2 className="text-center" style={{ color: error ? "red" : "black" }}>
          Detalle del Movimiento*
        </h2>
        {errorMessage && (
          <p style={{ color: "red" }} className="text-center">
            {errorMessage}
          </p>
        )}
      </div>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          insert(values);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <Select
                    placeholder="Seleccione el producto"
                    noOptionsMessage={() => "No hay productos"}
                    options={productsSelect}
                    onChange={(selected) => {
                      setFieldValue("Product_id", selected.value);
                      get_productInfo(selected.value);
                    }}
                    value={productsSelect.filter(
                      (data) => data.value === values.Product_id
                    )}
                  />
                </div>
                <div className="col-sm-3">
                  <button className="btn btn-primary" onClick={()=> OpenProductModal(true)} type="button">
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-5">
                  <label>Precio del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={numeral(
                      numeral(SelectedProduct.Price).value()
                    ).format(0, 0)}
                  />
                </div>
                <div className="col-sm-2">
                  <label>Stock Actual</label>
                  <input
                    type="number"
                    className="form-control"
                    disabled
                    value={SelectedProduct.Stock}
                  />
                </div>
                <div className="col-sm-2">
                  <label>Introduce la cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    max={SelectedProduct.Stock}
                    value={values.Quantity}
                    onChange={handleChange("Quantity")}
                    disabled={values.Product_id === 0}
                  />
                </div>
                <div className="col-sm-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    value="Agregar"
                    style={{ marginTop: "30px" }}
                    disabled={values.Quantity === 0}
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-10">
                  <Table
                    Titles={[
                      "Producto",
                      "Precio",
                      "Stock",
                      "Cantidad",
                      "SubTotal",
                      "Acción",
                    ]}
                    Body={array.map((item, index) => (
                      <tr key={index}>
                        <th>{item.product_name}</th>
                        <th>{item.Price}</th>
                        <th>{item.Stock}</th>
                        <th>{item.Quantity}</th>
                        <th>{numeral(item.subTotal).format(0, 0)}</th>
                        <th>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            href="#"
                            data-tip="Eliminar producto"
                            onClick={() => deleteProduct(index)}
                          >
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </th>
                      </tr>
                    ))}
                  />
                </div>
                <div className="col-sm">
                  <MovementTotals setTotal={setTotal} Details={array} />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

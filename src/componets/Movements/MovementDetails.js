import React, { Fragment, useState, useEffect } from "react";
import { Formik } from "formik";

import Select from "react-select";
import numeral from "numeral";
import {question} from '../../helpers/alerts';

import Table from "../Table";
import MovementTotals from './MovementTotals';

import { productsForSelect, GetProductById } from "../../http/Products";

export default function MovementDetails({Details, setDetails, error }) {
  const [initialValues, setInitialValues] = useState({
    product_id: 0,
    quantity: 0,
    stock: 0,
    price: 0,
    product_name: "",
  });
  const [array, setArray] = useState([]);
  const [productsSelect, setProductsSelect] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState({});

  useEffect(() => {
    async function Fetch() {
      const { data } = await productsForSelect();
      setProductsSelect(data.Data);

      if (Details.Length> 0){
        setArray(Details);
      }
      
    }
    Fetch();
  }, []);

  async function get_productInfo(id) {
    const { data } = await GetProductById(id);
    console.log(data.Data);
    setSelectedProduct(data.Data);
  }

  function insert(value) {
    const newArray = [...array];
    const object = {
      price: numeral(SelectedProduct.Price).format(0, 0),
      stock: SelectedProduct.Stock,
      name: SelectedProduct.Name,
      quantity: value.quantity,
      product_id: SelectedProduct.Id,
      subTotal: numeral(SelectedProduct.Price).value() * value.quantity
    };
    newArray.push(object);
    setArray(newArray);
    setDetails(newArray);

    //reset form:
    setSelectedProduct({});
  }

  async function deleteProduct(index) {
    const confirm = await question("¿Esta seguro de eliminar este producto de la lista?");

    if (confirm.value) {
      const newArray = [...array];
      newArray.splice(index);
      setArray(newArray);
      setDetails(newArray);
    }
  }

  return (
    <Fragment>
      <h2 className="text-center" style={{color: error? "red": "black"}}>Detalle del Movimiento*</h2>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur
        onSubmit={(values, { resetForm }) => {
          insert(values);
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, setFieldValue, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div style={{ width: "40%" }}>
                <Select
                  placeholder="Seleccione el producto"
                  noOptionsMessage={() => "No hay productos"}
                  options={productsSelect}
                  onChange={(selected) => {
                    setFieldValue("product_id", selected.value);
                    get_productInfo(selected.value);
                  }}
                  value={productsSelect.filter(
                    (data) => data.value === values.product_id
                  )}
                />
              </div>
              <br />
              <div className="row">
                <div className="col-sm-5">
                  <label>Precio del Producto</label>
                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={numeral(numeral(SelectedProduct.Price).value()).format(0, 0)}
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
                    value={values.quantity}
                    onChange={handleChange("quantity")}
                    disabled={
                      values.product_id===0
                    }
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Agregar"
                    style={{ marginTop: "30px" }}
                    disabled={
                      values.quantity===0
                    }
                  />
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
                      <th>{item.name}</th>
                      <th>{item.price}</th>
                      <th>{item.stock}</th>
                      <th>{item.quantity}</th>
                      <th>
                        {numeral(item.subTotal).format(0,0)}
                      </th>
                      <th>
                        <a
                          className="btn btn-secondary"
                          href="#"
                          data-tip="Eliminar producto"
                          onClick={() => deleteProduct(index)}
                        >
                          <i class="fas fa-trash-alt"></i>
                        </a>
                      </th>
                    </tr>
                  ))}
                />
                </div>
                <div className="col-sm">
                    <MovementTotals
                    Details={array}
                    />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

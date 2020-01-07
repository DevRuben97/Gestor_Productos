import React, { useState } from "react";
import { Formik } from "formik";
import {USER_LOGIN_SCHEMA} from '../helpers/formValidations';

const Login = props => {
  const [UserLogin, setLogin] = useState({
    user: "",
    password: ""
  });

  function Login(value) {
      localStorage.setItem('logged','true');
      
  }

  return (
    <div className="Login">
      <div className="login-container">
        <div className="card card-body-border">
          <div className="card-body">
            <h2 className="text-center">Bienvenido</h2>
            <label>Ingresa tus credenciales de acceso</label>
            <div className="row">
              <div className="col">
                <Formik
                  initialValues={UserLogin}
                  onSubmit={values => Login(values)}
                  validationSchema={USER_LOGIN_SCHEMA}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <form onSubmit={handleSubmit}>
                      <label>Correo</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="tucorreo@ejemplo.com"
                        onChange={handleChange('user')}
                      />
                      <label className="ValidatetionError">{errors.user}</label>
                      <br />
                      <label>Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Ingrese su contraseña"
                        onChange={handleChange('password')}
                      />
                      <label className="ValidatetionError">{errors.password}</label>
                      <br />
                      <button 
                      className="btn btn-primary btn-lg btn-block" 
                      type="submit"
                      disabled={values.user=== ''|| values.password===''}
                      >
                        <i class="fas fa-arrow-circle-right"></i> Iniciar Sessión
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

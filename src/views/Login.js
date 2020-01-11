import React, { useState,useContext } from "react";
import { Formik } from "formik";
import {USER_LOGIN_SCHEMA} from '../helpers/formValidations';
import Auth from "../Context/AuthContext";
import UserInfo from '../Context/UserContext';
import { login } from "../http/Auth";
import Swal from "sweetalert2";

const Login = props => {
  const {setLogged} = useContext(Auth)
  const {SetUser}= useContext(UserInfo);

  const [UserLogin, setLogin] = useState({
    Email: "",
    Password: ""
  });
  

 async function LoginUser(value) {

    const {data}= await login(value);

    if (data.OperationSuccess){
      SetUser(data.Data)
      localStorage.setItem('logged','true');
      setLogged(true);
    }
    else{
      Swal.fire({
        icon: 'error',
        text: data.Message,
        title: 'Iniciar Sessión'
      })
    }

      
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
                  onSubmit={values => LoginUser(values)}
                  validationSchema={USER_LOGIN_SCHEMA}
                >
                  {({ handleSubmit, handleChange, values, errors }) => (
                    <form onSubmit={handleSubmit}>
                      <label>Correo</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="tucorreo@ejemplo.com"
                        onChange={handleChange('Email')}
                      />
                      <label className="ValidatetionError">{errors.Email}</label>
                      <br />
                      <label>Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Ingrese su contraseña"
                        onChange={handleChange('Password')}
                      />
                      <label className="ValidatetionError">{errors.Password}</label>
                      <br />
                      <button 
                      className="btn btn-primary btn-lg btn-block" 
                      type="submit"
                      disabled={values.Email=== ''|| values.Password===''}
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

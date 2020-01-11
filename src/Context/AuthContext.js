import react, { createContext } from "react";

const Auth = createContext({
  isLogged: null,
  setLogged: null
});

export default Auth;

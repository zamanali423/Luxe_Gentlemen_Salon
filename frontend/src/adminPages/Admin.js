import React, { useContext } from "react";
import Dashboard from "../adminComponents/Dashboard";
import { productContext } from "../context/productContext/productContext";
import Login from "./Login";

const Admin = () => {
  const { isLogin } = useContext(productContext);

  return <>{isLogin ? <Dashboard /> : <Login />}</>;
};

export default Admin;

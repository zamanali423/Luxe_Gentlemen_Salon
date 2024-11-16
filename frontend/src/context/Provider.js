import React, { useEffect, useRef, useState } from "react";
import { productContext } from "./productContext/productContext";

const Provider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [allServices, setAllServices] = useState([]);
  const [barberNo, setBarberNo] = useState("");
  const [role, setRole] = useState("");
  const isLogin = !!token;
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUser(null);
  };

  //! User
  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchUser = await fetch(
          "https://luxe-barber-shop-backend.vercel.app/admin/getUser",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await fetchUser.json();
        setUser(data);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    if (token) {
      getUser();
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const res = await fetch(
          "https://luxe-barber-shop-backend.vercel.app/services"
        );
        const services = await res.json();
        setAllServices(services);
        console.log("services", services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    getServices();
  }, []);

  return (
    <productContext.Provider
      value={{
        user,
        token,
        setToken,
        isLogin,
        logout,
        allServices,
        setAllServices,
        servicesRef,
        barberNo,
        setBarberNo,
        role,
        setRole,
        aboutRef,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default Provider;

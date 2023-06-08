import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "../../pages";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Routing;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Tester } from "../../pages";

const Routing = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Tester />} />
    </Routes>
  );
};

export default Routing;

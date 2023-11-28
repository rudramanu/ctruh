import React from "react";
import { Routes, Route } from "react-router-dom";
import CardList from "./components/CardList";
import CardDetails from "./components/CardDetails";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CardList />} />
      <Route path="/post/:id" element={<CardDetails />} />
    </Routes>
  );
};

export default Allroutes;

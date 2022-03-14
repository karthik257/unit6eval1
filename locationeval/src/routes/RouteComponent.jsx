import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { PostData } from "../components/PostData";

export const RouteComponent = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/api/addresses" element={<PostData />}></Route>
      </Routes>
    </div>
  );
};

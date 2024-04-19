import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "../router/routes";

const AppRouter = () => {
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route path={route.path} element={<route.component />} key={index} />
      ))}
      <Route path="*" element={<Navigate to={`/signin`} />} />
    </Routes>
  );
};

export default AppRouter;

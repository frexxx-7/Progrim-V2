import React, { useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { publicRoutes } from "../router/routes";
import '../index.scss';
import { CSSTransition, SwitchTransition } from "react-transition-group";

const AppRouter = () => {
  const location = useLocation()
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition nodeRef={nodeRef} key={location.pathname} classNames="fade" timeout={300} unmountOnExit >
        <div ref={nodeRef}>
          <Routes location={location}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.Component />}
              />
            ))}
            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppRouter;
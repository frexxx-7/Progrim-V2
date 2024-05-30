import React, { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import '../index.scss';
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { useStateContext } from "../context/ContextProvider";
import axiosCLient from "../axios.client";

const AppRouter = () => {
  const location = useLocation()
  const nodeRef = useRef(null);

  const { token, setUser, user } = useStateContext()

  useEffect(() => {
    axiosCLient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

  return (
    <SwitchTransition>
      <CSSTransition nodeRef={nodeRef} key={location.pathname} classNames="fade" timeout={300} unmountOnExit >
        <div ref={nodeRef}>

          {
            user && token 
            ?
              <Routes location={location}>

                {privateRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.Component children={<route.childComponent/>}/>}
                  />
                ))
                }
                <Route path="*" element={<Navigate to="/main" />} />

              </Routes>

              :
              <Routes location={location}>

                {publicRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.Component />}
                  />
                ))
                }
                <Route path="*" element={<Navigate to="/signin" />} />
              </Routes>
          }
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AppRouter;
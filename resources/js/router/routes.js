import Autorization from "../pages/Autorization/Autorization";
import Main from "../pages/Main/Main";
import Registration from "../pages/Registration/Registration";

export const publicRoutes = [
  { path: "/signin", Component: Autorization },
  { path: "/signup", Component: Registration },
  { path: "/main", Component: Main },
];

import Autorization from "../pages/Autorization/Autorization";
import Registration from "../pages/Registration/Registration";

export const publicRoutes = [
  { path: "/signin", component: Autorization },
  { path: "/signup", component: Registration },
];

import Autorization from "../pages/Autorization/Autorization";
import Main from "../pages/Main/Main";
import MainPage from "../pages/MainPage/MainPage";
import News from "../pages/News/News";
import Registration from "../pages/Registration/Registration";

export const publicRoutes = [
  { path: "/signin", Component: Autorization },
  { path: "/signup", Component: Registration },
];

export const privateRoutes = [
  { path: "/main", Component: Main, childComponent: MainPage },
  { path: "/news", Component: Main, childComponent: News },
];

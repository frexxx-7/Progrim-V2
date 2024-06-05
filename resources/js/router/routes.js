import Autorization from "../pages/Autorization/Autorization";
import Friends from "../pages/Friends/Friends";
import Main from "../pages/Main/Main";
import MainPage from "../pages/MainPage/MainPage";
import News from "../pages/News/News";
import Profile from "../pages/Profile/Profile";
import Registration from "../pages/Registration/Registration";
import EditProfile from "../pages/EditProfile/EditProfile";
import Messages from "../pages/Messages/Messages";
import Organizations from "../pages/Organizations/Organizations";
import Settings from "../pages/Settings/Settings";

export const publicRoutes = [
  { path: "/signin", Component: Autorization },
  { path: "/signup", Component: Registration },
];

export const privateRoutes = [
  { path: "/main", Component: Main, childComponent: MainPage },
  { path: "/news", Component: Main, childComponent: News },
  { path: "/profile", Component: Main, childComponent: Profile },
  { path: "/friends", Component: Main, childComponent: Friends },
  { path: "/editProfile", Component: Main, childComponent: EditProfile },
  { path: "/messages", Component: Main, childComponent: Messages },
  { path: "/messages/:id", Component: Main, childComponent: Messages },
  { path: "/organizations", Component: Main, childComponent: Organizations },
  { path: "/settings", Component: Main, childComponent: Settings },
];

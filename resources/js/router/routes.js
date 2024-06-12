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
import CreateOrganizations from "../pages/CreateOrganizations/CreateOrganizations";
import ShowOrganization from "../pages/ShowOrganization/ShowOrganization";
import EditOrganization from "../pages/EditOrganization/EditOrganization";

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
  { path: "/createOrganization", Component: Main, childComponent: CreateOrganizations },
  { path: "/organization/:id", Component: Main, childComponent: ShowOrganization },
  { path: "/editOrganization/:id", Component: Main, childComponent: EditOrganization },

];

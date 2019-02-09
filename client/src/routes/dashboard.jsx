// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BlurOn from "@material-ui/icons/BlurOn";
import People from "@material-ui/icons/People";
import SettingsInputAntenna from "@material-ui/icons/SettingsInputAntenna";
import Home from "@material-ui/icons/Home";

// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";

import ReadersPage from "views/ReadersPage";
import ProductsPage from "views/ProductsPage";
import UsersPage from "views/UsersPage";
// Auth Views
import AuthLogIn from "views/AuthLogIn";
import AuthSignUp from "views/AuthSignUp";

import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import LandingPage from "../views/LandingPage";

const dashboardRoutes = [
 
  {
    path: "/welcome",
    sidebarName: "Welcome",
    navbarName: "Welcome",
    icon: Home,
    component: LandingPage
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/login",
    sidebarName: "LogIn",
    navbarName: "LogIn",
    icon: Person,
    component: AuthLogIn
  },
  {
    path: "/signup",
    sidebarName: "SignUp",
    navbarName: "SignUp",
    icon: Person,
    component: AuthSignUp
  },
  {
    path: "/readers",
    sidebarName: "Readers",
    navbarName: "Readers",
    icon: SettingsInputAntenna,
    component: ReadersPage
  },
  {
    path: "/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: BlurOn,
    component: ProductsPage
  },
  {
    path: "/users",
    sidebarName: "Users",
    navbarName: "Users",
    icon: People,
    component: UsersPage
  },
  {
    path: "/user",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/welcome", navbarName: "Redirect" }
  // {
  //   path: "/table",
  //   sidebarName: "Table List",
  //   navbarName: "Table List",
  //   icon: "content_paste",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   sidebarName: "Typography",
  //   navbarName: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography
  // },
  // {
  //   path: "/icons",
  //   sidebarName: "Icons",
  //   navbarName: "Icons",
  //   icon: BubbleChart,
  //   component: Icons
  // },
  // {
  //   path: "/maps",
  //   sidebarName: "Maps",
  //   navbarName: "Map",
  //   icon: LocationOn,
  //   component: Maps
  // },
  // {
  //   path: "/notifications",
  //   sidebarName: "Notifications",
  //   navbarName: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage
  // },

];

export default dashboardRoutes;

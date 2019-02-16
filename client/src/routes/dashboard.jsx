// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import BlurOn from "@material-ui/icons/BlurOn";
import People from "@material-ui/icons/People";
import SettingsInputAntenna from "@material-ui/icons/SettingsInputAntenna";
import Home from "@material-ui/icons/Home";

// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";

import ReadersPage from "views/ReadersPage";
import ProductsPage from "views/ProductsPage";
import UsersPage from "views/UsersPage";
// Auth Views
import AuthLogIn from "views/AuthLogIn";
import AuthSignUp from "views/AuthSignUp";

import UserProfile from "views/UserProfile/UserProfile.jsx";
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
    path: "/profile",
    sidebarName: "Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/welcome", navbarName: "Redirect" }
];

export default dashboardRoutes;

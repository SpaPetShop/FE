import Dashboard from "../pages/admin/Dashboard";
import Home from "../pages/common/Home";
import Login from "../pages/common/Authentication/Login";
import Page401 from "../pages/common/ErrorPage/Page401";
import Page403 from "../pages/common/ErrorPage/Page403";
import Register from "../pages/common/Authentication/Register";
import Profile from "../pages/customer/Profile";

export const commonRoutes = [
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/401",
    element: <Page401 />,
  },
  {
    path: "/403",
    element: <Page403 />,
  },
];


export const adminRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/manage-customers",
    element: <Home />
  }
];

export const customerRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  }
];
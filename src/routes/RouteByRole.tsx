import Dashboard from "../pages/admin/Dashboard";
import ManageOderList from "../pages/admin/ManageMenu/ManageOderList";
import TotalCustomer from "../pages/admin/ManageMenu/ToltalCustomer";
import TotalManager from "../pages/admin/ManageMenu/TotalManager";
import TotalStaff from "../pages/admin/ManageMenu/TotalStaff";
import Login from "../pages/common/Authentication/Login";
import Register from "../pages/common/Authentication/Register";
import ContactPage from "../pages/common/Contact";
import Page401 from "../pages/common/ErrorPage/Page401";
import Page403 from "../pages/common/ErrorPage/Page403";
import Home from "../pages/common/Home";
import Profile from "../pages/customer/Profile";
import DetailCustomer from "../pages/manager/DetailCustomer";
import DetailService from "../pages/manager/DetailService";
import ListOrder from "../pages/manager/ListOrder";
import ListService from "../pages/manager/ListService";
import ListStaff from "../pages/manager/ListStaff";
import ListUser from "../pages/manager/ListUser";
import StaffCalendar from "../pages/staff/StaffCalendar";

export const commonRoutes = [
  {
    path: "/login",
    element: <Login />,
    isWrapLayout: false
  },
  {
    path: "/register",
    element: <Register />,
    isWrapLayout: false
  },
  {
    path: "/contact",
    element: <ContactPage />,
    isWrapLayout: true
  },
  {
    path: "/401",
    element: <Page401 />,
    isWrapLayout: false
  },
  {
    path: "/403",
    element: <Page403 />,
    isWrapLayout: false
  },
];

export const adminRoutes = [
  {
    path: "/admin-dashboard",
    element: <Dashboard />,
  },
  
  {
    path: "/manage-customers",
    element: <Home />
  },
   {
    path: "/admin-manage-customers",
    element: <Home />,
   },
   {
    path: "/admin-manage-totalCustomer",
    element: <TotalCustomer />,
   },
   {
    path: "/admin-manage-totalStaff",
    element: <TotalStaff />,
   },
   {
    path: "/admin-manage-totalManager",
    element: <TotalManager />,
   },
   {
    path: "/admin-manage-oderList",
    element: <ManageOderList />,
   }

  
];

export const managerRoutes = [
  {
    path: "/manager-dashboard",
    element: <Dashboard />,
  },
  {
    path: "/manager-manage-customer",
    element: <ListUser />,
  },
  {
    path: "/manager-manage-customer/:id",
    element: <DetailCustomer />,
  },
  {
    path: "/manager-manage-staff",
    element: <ListStaff />,
  },
  {
    path: "/manager-manage-service",
    element: <ListService />,
  },
  {
    path: "/manager-manage-service/:id",
    element: <DetailService />,
  },
  {
    path: "/manager-manage-order",
    element: <ListOrder />,
  },
];

export const customerRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
];

export const staffRoutes = [
  {
    path: "/staff-calendar",
    element: <StaffCalendar />,
  },
];

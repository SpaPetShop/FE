import { Route, Routes } from "react-router-dom";
import {
  adminRoutes,
  customerRoutes,
  commonRoutes,
  managerRoutes,
  staffRoutes,
} from "./RouteByRole";
import { ROLES } from "./roles";
import AuthRoute from "./AuthRoute";
import Sidebar from "../components/common/sidebar/Sidebar";
import WrapLayoutCustomer from "../components/common/wrapper/WrapLayoutCustomer";
import Page404 from "../pages/common/ErrorPage/Page404";
import Home from "../pages/common/Home";
import CheckAuthenticate from "../components/common/wrapper/CheckAuthenticate";

const AppRoutes = () => {
  return (
    <Routes>
      {commonRoutes.map((route: any, index: any) => {
        if (route.path === "/login")
          return (
            <Route element={<CheckAuthenticate />}>
              <Route key={index} path={route.path} element={route.element} />
            </Route>
          );
        else
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
      })}

      {/* Customer routes with protected */}

      <Route element={<WrapLayoutCustomer />}>
        <Route path={"/"} element={<Home />} />;
        <Route element={<AuthRoute allowedRoles={[ROLES.CUSTOMER]} />}>
          {customerRoutes.map((route: any, index: any) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>
      </Route>

      {/* Admin routes with protected */}
      <Route element={<AuthRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<Sidebar />}>
          {adminRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>
      </Route>

      {/* Manager routes with protected */}
      <Route element={<AuthRoute allowedRoles={[ROLES.MANAGER]} />}>
        <Route element={<Sidebar />}>
          {managerRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>
      </Route>

      {/* Staff routes with protected */}
      <Route element={<AuthRoute allowedRoles={[ROLES.STAFF]} />}>
        <Route element={<Sidebar />}>
          {staffRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          })}
        </Route>
      </Route>

      {/* Routes not exist */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;

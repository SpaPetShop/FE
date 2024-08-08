import { Route, Routes } from "react-router-dom";
import { adminRoutes, customerRoutes, commonRoutes } from "./RouteByRole";
import { ROLES } from "./roles";
import AuthRoute from "./AuthRoute";
import Sidebar from "../components/common/sidebar/Sidebar";
import WrapLayoutCustomer from "../pages/customer/WrapLayoutCustomer";
import Page404 from "../pages/common/ErrorPage/Page404";
import Home from "../pages/common/Home";

const AppRoutes = () => {
  return (
    <Routes>
      {commonRoutes.map((route: any, index: any) => {
        return <Route key={index} path={route.path} element={route.element} />;
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

      {/* Routes not exist */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;

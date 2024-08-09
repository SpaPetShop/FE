import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const currentUser = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        onClick={() => {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              accessToken: "abc",
              avatarUrl: "",
              email: "",
              id: "123",
              name: "Hà Thành Đạt - Master FE",
              role: "ADMIN",
            })
          );
          currentUser.setUser({
            accessToken: "abc",
            avatarUrl: "",
            email: "",
            id: "123",
            name: "Hà Thành Đạt - Master FE",
            role: "ADMIN",
          });
          navigate("/admin-dashboard");
        }}
      >
        Login with admin role
      </Button>

      <Button
        onClick={() => {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              accessToken: "abc",
              avatarUrl: "",
              email: "",
              id: "123",
              name: "Hà Thành Đạt - Master FE",
              role: "MANAGER",
            })
          );
          currentUser.setUser({
            accessToken: "abc",
            avatarUrl: "",
            email: "",
            id: "123",
            name: "Hà Thành Đạt - Master FE",
            role: "MANAGER",
          });
          navigate("/manager-dashboard");
        }}
      >
        Login with manager role
      </Button>
      <Button
        onClick={() => {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              accessToken: "abc",
              avatarUrl: "",
              email: "",
              id: "123",
              name: "Hà Thành Đạt - Master FE",
              role: "STAFF",
            })
          );
          currentUser.setUser({
            accessToken: "abc",
            avatarUrl: "",
            email: "",
            id: "123",
            name: "Hà Thành Đạt - Master FE",
            role: "STAFF",
          });
          navigate("/");
        }}
      >
        Login with staff role
      </Button>
      <Button
        onClick={() => {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              accessToken: "abc",
              avatarUrl: "",
              email: "",
              id: "123",
              name: "Hà Thành Đạt - Master FE",
              role: "CUSTOMER",
            })
          );
          currentUser.setUser({
            accessToken: "abc",
            avatarUrl: "",
            email: "",
            id: "123",
            name: "Hà Thành Đạt - Master FE",
            role: "CUSTOMER",
          });
          navigate("/");
        }}
      >
        Login with customer role
      </Button>

      <Button
        onClick={() => {
          localStorage.removeItem("userData");
          currentUser.setUser(null);
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Login;

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
              name: "Hà đạt",
              role: "ADMIN",
            })
          );
          currentUser.setUser({
            accessToken: "abc",
            avatarUrl: "",
            email: "",
            id: "123",
            name: "Hà đạt",
            role: "ADMIN",
          });
          navigate("/");
        }}
      >
        Login
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

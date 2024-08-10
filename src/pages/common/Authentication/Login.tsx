import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import PetsIcon from '@mui/icons-material/Pets';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ROLES } from "../../../routes/roles";
import { UserContext } from "../../../context/AuthContext";
import { LoadingComponentVersion1, LoadingComponentVersion2 } from "../../../components/common/loading/Backdrop";

const validationSchema = Yup.object({
  username: Yup.string()
    .required("User name required")
    .max(30, "User is too long!"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "At least 6 characters")
    .max(20, "Password is too long, max 20 characters!"),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useContext(UserContext);
  const handleNavigateByRole = (role: string) => {
    switch (role) {
      case ROLES.ADMIN:
        return navigate("/admin-dashboard");
      case ROLES.MANAGER:
        return navigate("/manager-dashboard");
      case ROLES.CUSTOMER:
        return navigate("/");
      case ROLES.STAFF:
        return navigate("/");
    }
  };

  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        // paddingTop: "20vh",
        backgroundImage: 'url("/background_login.jpg")',
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <LoadingComponentVersion2 open={isLoading}/>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.5)", p: 5 }}
      >
        <Box
          sx={{
            // m: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#ff5722",
            }}
          >
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{mb:2}}>
            Chào mừng bạn đến với PET SPA
          </Typography>
          <Formik
            initialValues={{
              username: "",          
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              try {
                setIsLoading(true)
                console.log(values);
                // call api here
                localStorage.setItem(
                  "userData",
                  JSON.stringify({
                    accessToken: "abc",
                    avatarUrl: "",
                    email: "",
                    id: "123",
                    name: "Hà Thành Đạt - Master FE",
                    role: values.username.toUpperCase(),
                  })
                );
                currentUser.setUser({
                  accessToken: "abc",
                  avatarUrl: "",
                  email: "",
                  id: "123",
                  name: "Hà Thành Đạt - Master FE",
                  role: values.username.toUpperCase(),
                });
                handleNavigateByRole(values.username.toUpperCase());
                toast.success("Login thành công !");
              } catch (error) {
                toast.error("Login thất bại !");
              }finally{
                setIsLoading(false)
              }
            }}
          >
            {({ values }) => (
              <Form>
                <Field name={`username`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Tên đăng nhập:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        placeholder="Nhập tên đăng nhập..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <Box mb={2}></Box>
                <Field name={`password`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Mật khẩu:
                      </Typography>
                      <TextField
                        {...field}
                        type="password"
                        size="small"
                        placeholder="Nhập mật khẩu..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 400 }}
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  sx={{mt:1}}
                  label="Ghi nhớ tôi"
                />
             
            <Button
            type="submit"
            fullWidth
            style={{
              borderRadius: 35,
              backgroundColor: "#ff5722",
              // padding: "18px 36px",
              fontSize: "18px",
            }}
            sx={{mt:2}}
            variant="contained"
          >
            Đăng nhập
          </Button>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={1} sx={{mt:2, cursor:"pointer"}}
          onClick={() =>navigate("/")}
          >
          <KeyboardBackspaceIcon fontSize="small"/>
          <Typography align="center" variant="body2" >Quay trở lại</Typography>
         
          </Stack>
              </Form>
            )}
          </Formik>
         
        </Box>
      </Container>
    </Box>
  );
}

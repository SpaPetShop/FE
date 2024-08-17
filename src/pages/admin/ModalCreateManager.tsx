import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Field, Form, Formik } from "formik";
  import * as Yup from "yup";
  import { toast } from "react-toastify";
  import AdminManageStaffAPI from "../../utils/AdminMangeStaffAPI";
  
  // Validation schema for form fields
  const validationSchema = Yup.object({
    username: Yup.string().required("Tên đăng nhập không được để trống!"),
    password: Yup.string().required("Mật khẩu không được để trống!"),
    fullName: Yup.string().required("Tên nhân viên không được để trống!"),
    gender: Yup.string().required("Giới tính không được để trống!"),
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống!")
      .matches(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số!"),
    role: Yup.string().required("Vai trò không được để trống!"),
    address: Yup.string().required("Địa chỉ không được để trống!"),
    email: Yup.string().email("Email không hợp lệ").required("Email không được để trống!"),
    yearsOfExperience: Yup.number().required("Kinh nghiệm không được để trống!").min(0, "Kinh nghiệm phải lớn hơn hoặc bằng 0"),
    image: Yup.mixed().required("Ảnh nhân viên không được thiếu!"),
  });
  
  type ModalCreateManagerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  export default function ModalCreateStaff({ open, setOpen }: ModalCreateManagerProps) {
    const [imgSrc, setImgSrc] = React.useState<string | ArrayBuffer | null>("");
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
      try {
        const imageFile = values.image;
        let imageBase64 = "";
  
        if (imageFile) {
          const reader = new FileReader();
          reader.onloadend = async () => {
            imageBase64 = reader.result as string;
  
            const payload = {
              ...values,
              image: imageBase64,
              yearsOfExperience: Number(values.yearsOfExperience),
            };
  
            try {
              await AdminManageStaffAPI.create(payload);
              toast.success("Tạo thành công!");
              setOpen(false);
            } catch (apiError) {
              console.error("API Error:", apiError);
              toast.error("Tạo thất bại! Vui lòng kiểm tra lại thông tin.");
            }
  
            setSubmitting(false);
          };
          reader.readAsDataURL(imageFile);
        } else {
          toast.error("Ảnh nhân viên không hợp lệ!");
          setSubmitting(false);
        }
      } catch (error) {
        console.error("Submission Error:", error);
        toast.error("Tạo thất bại! Vui lòng kiểm tra lại thông tin.");
        setSubmitting(false);
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Formik
          initialValues={{
            username: "",
            password: "",
            fullName: "",
            gender: "",
            phoneNumber: "",
            role: "manager",
            address: "",
            email: "",
            yearsOfExperience: "",
            image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, isSubmitting }) => (
            <Form>
              <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
                {"TẠO TÀI KHOẢN MANAGER"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          src={imgSrc as string}
                          sx={{
                            objectFit: "contain",
                            width: 250,
                            height: 250,
                            border: "1px solid",
                            mb: 2,
                          }}
                        />
                        <Field name="image">
                          {({ field, form }: any) => (
                            <>
                              <Button
                                component="label"
                                color="info"
                                variant="outlined"
                                size="small"
                              >
                                Chọn ảnh Manager
                                <input
                                  hidden
                                  type="file"
                                  accept="image/png, image/jpeg"
                                  onChange={(event) => {
                                    const files = event.currentTarget.files;
                                    if (files && files.length !== 0) {
                                      const reader = new FileReader();
                                      reader.onload = () => setImgSrc(reader.result);
                                      reader.readAsDataURL(files[0]);
                                      setFieldValue(field.name, files[0]);
                                    }
                                  }}
                                />
                              </Button>
                              {touched.image && errors.image && (
                                <div
                                  style={{
                                    color: "red",
                                    fontSize: "13px",
                                    marginLeft: "12px",
                                    marginTop: "5px",
                                  }}
                                >
                                  {errors.image}
                                </div>
                              )}
                            </>
                          )}
                        </Field>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="username">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Tên tài khoản:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập tài khoản..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="password">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Mật khẩu:
                            </Typography>
                            <TextField
                              {...field}
                              type="password"
                              size="small"
                              fullWidth
                              placeholder="Nhập mật khẩu..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="fullName">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Tên đầy đủ:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập tên đầy đủ..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="gender">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Giới tính:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập giới tính..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="phoneNumber">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Số điện thoại:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập số điện thoại..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="address">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Địa chỉ:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập địa chỉ..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="email">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Email:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập email..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="yearsOfExperience">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Kinh nghiệm:
                            </Typography>
                            <TextField
                              {...field}
                              type="number"
                              size="small"
                              fullWidth
                              placeholder="Nhập số năm kinh nghiệm..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                      <Field name="role">
                        {({ field, meta }: any) => (
                          <>
                            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                              Vai trò:
                            </Typography>
                            <TextField
                              {...field}
                              type="text"
                              size="small"
                              fullWidth
                              placeholder="Nhập vai trò..."
                              error={meta.touched && !!meta.error}
                              helperText={meta.touched && meta.error ? meta.error : ""}
                            />
                          </>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </DialogContentText>
              </DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 1,
                  p: 1,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu"}
                </Button>
                <Button
                  type="button"
                  color="error"
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ ml: 2 }}
                >
                  Đóng
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Dialog>
    );
  }
  
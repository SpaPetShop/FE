import {
    Box,
    DialogActions,
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
  import Button from "@mui/material/Button";
  import Dialog from "@mui/material/Dialog";
  import DialogContent from "@mui/material/DialogContent";
  import DialogTitle from "@mui/material/DialogTitle";
  import { Field, Form, Formik } from "formik";
  import * as React from "react";
  import { toast } from "react-toastify";
  import * as Yup from "yup";
import petAPI from "../../utils/PetAPI";
import { TPetType } from "../../types/Pet/PetType";

  
  const validationSchema = Yup.object({
    name: Yup.string().required("*Tên thú cưng không được để trống!"),
    age: Yup.number().required("*Tuổi thú cưng không được để trống!"),
    weight: Yup.number().required("*Cân nặng thú cưng không được để trống!"),
    image: Yup.string().required("*Ảnh thú cưng không được để trống!"),
    typePetId: Yup.string().required("*Loại thú cưng không được để trống!")
  });
  
  type ModalCreatePetProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchAllPet: () => void;
  };
  export default function ModalCreatePet({
    open,
    setOpen,
    fetchAllPet,
  }: ModalCreatePetProps) {
    const [isLoading, setIsLoading] = React.useState(false)
    const [listPetType, setListPetType] = React.useState<TPetType[] | []>([])
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(()=>{
        const fetchAllPetType = async () => {
            try {
              setIsLoading(true);
              const data = await petAPI.getAllPetType({page: 1, size: 100, Status: "ACTIVE"});
              console.log({ data });
              setListPetType(data.items);
            } catch (error) {
              console.log("Error get list PetType: ", error);
            } finally {
              setIsLoading(false);
            }
    }
    fetchAllPetType()
},[])
    return (
      <>
        <Dialog open={open}>
          <Formik
            initialValues={{
              name: "",
              weight: "",
              age: "",
              image: "",
              typePetId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
           console.log(values);  
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <DialogTitle
                  id="alert-dialog-title"
                  sx={{
                    textAlign: "center",
                    backgroundImage:
                      "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
                  }}
                >
                  {"TẠO THÚ CƯNG MỚI"}
                </DialogTitle>
                <DialogContent>
                  <Field name={`name`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1, mt: 2 }}
                        >
                          Tên thú cưng*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          size="small"
                          placeholder="Nhập tên thú cưng ..."
                          fullWidth
                          autoComplete="off"
                          sx={{ minWidth: 400 }}
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Box mb={3}></Box>
                  <Field name={`weight`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                          Cân nặng*
                        </Typography>
                        <TextField
                          {...field}
                          type="number"
                          placeholder="Nhập cân nặng..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Field name={`age`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                          Độ tuổi thú cưng*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          placeholder="Nhập độ tuổi..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Field name={`image`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                         URL ảnh thú cưng*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          placeholder="Nhập độ tuổi..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Field name={`description`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                          Độ tuổi thú cưng*
                        </Typography>
                        <TextField
                          {...field}
                          type="number"
                          placeholder="Nhập độ tuổi..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>

                  <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Loại thú cưng*
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.typePetId && Boolean(errors.typePetId)}
                >
                  <Field
                    as={Select}
                    name="categoryId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.typePetId}
                  >
                    {listPetType.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Field>
                  <FormHelperText>*Vui lòng chọn loại thú cưng</FormHelperText>
                </FormControl>
                </DialogContent>
                <DialogActions>
                  <Stack direction={"row"} sx={{ mt: 4 }} spacing={3}>
                    <Button
                      fullWidth
                      color="error"
                      onClick={handleClose}
                      variant="outlined"
                    >
                      Hủy
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      autoFocus
                      color="info"
                      type="submit"
                    >
                      Nộp
                    </Button>
                  </Stack>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </>
    );
  }
  
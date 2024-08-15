import {
  Box,
  DialogActions,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Switch,
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
import { ProductType } from "../../../../types/Product/ProductType";
import SubProductAPI from "../../../../utils/SubProductAPI";
import LoadingComponentVersion2 from "../../../common/loading/Backdrop";
import CategoryAPI from "../../../../utils/CategoryAPI";
import { CategoryType } from "../../../../types/Category/CategoryType";
  
const validationSchema = Yup.object({
  name: Yup.string().required("*Tên sản phẩm không được để trống!"),
  description: Yup.string().required("*Mô tả không được để trống!"),
  stockPrice: Yup.number()
    .required("*Giá gốc không được để trống!")
    .min(1000, "Giá gốc không thể nhỏ hơn 1000 VNĐ!"),
  sellingPrice: Yup.number()
    .required("*Giá bán không được để trống!")
    .min(1000, "Giá bán không thể nhỏ hơn 1000 VNĐ!"),
  status: Yup.string().required("Trạng thái không được để trống !"),
  categoryId: Yup.string().required("Trạng thái không được để trống !")
});
  
  type ModalUpdateProductProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchAllProduct: () => void;
    data: ProductType;
  };
  export default function ModalUpdateProduct({
    open,
    setOpen,
    fetchAllProduct,
    data,
  }: ModalUpdateProductProps) {
  
    const [listCategory, setListCategory] = React.useState<CategoryType[] | []>(
      []
    );
    const [isLoading, setIsLoading] = React.useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    React.useEffect(() => {
      const fetchListCategory = async () => {
        try {
          setIsLoading(true);
          const data = await CategoryAPI.getAll({ page: 1, size: 100 });
          console.log({ data });
          setListCategory(data.items);
        } catch (error) {
          console.log("Error get list Category: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchListCategory();
    }, []);
    if (data)
      return (
        <>
          <Dialog open={open}>
            <Formik
              initialValues={{
                name: data.name || "",
                description: data.description || "",
                stockPrice: data.stockPrice ||"",
                sellingPrice: data.sellingPrice ||"",
                status: data.status ||"",
                categoryId: data.category.id ||"",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  const submitData = {
                    ...values            
                  }
                  const response = await SubProductAPI.update(data.id, submitData);
                  console.log({ response });
                  setOpen(false);
                  toast.success("Cập nhật thành công !");
                  fetchAllProduct();
                } catch (error) {
                  toast.error("Cập nhật thất bại !");
                }
              }}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <DialogTitle
                    id="alert-dialog-title"
                    sx={{ textAlign: "center" }}
                  >
                    {"CẬP NHẬT THỂ LOẠI"}
                  </DialogTitle>
                  <DialogContent>
                <Field name={`name`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Tên sản phẩm:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        size="small"
                        placeholder="Nhập tên thể loại ..."
                        fullWidth
                        autoComplete="off"
                        sx={{ minWidth: 456 }}
                        //   label="Name of the product"
                        error={meta.touched && !!meta.error}
                        helperText={
                          meta.touched && meta.error ? meta.error : ""
                        }
                      />
                    </>
                  )}
                </Field>
                <Box mb={2}></Box>
                <Field name={`description`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Mô tả:
                      </Typography>
                      <TextField
                        {...field}
                        type="text"
                        multiline
                        minRows={4}
                        placeholder="Nhập mô tả..."
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
                <Box mb={2}></Box>
                <Field name={`stockPrice`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Giá gốc sản phẩm:
                      </Typography>
                      <TextField
                        {...field}
                        type="number"
                        size="small"
                        placeholder="Nhập giá gốc..."
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
                <Box mb={2}></Box>
                <Field name={`sellingPrice`}>
                  {({ field, meta }: any) => (
                    <>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "black", mb: 1 }}
                      >
                        Giá bán sản phẩm:
                      </Typography>
                      <TextField
                        {...field}
                        type="number"
                        size="small"
                        placeholder="Nhập giá bán..."
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

                <Box mb={2}></Box>
                <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Loại sản phẩm:
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.categoryId && Boolean(errors.categoryId)}
                >
                  <Field
                    as={Select}
                    name="categoryId"                
                  onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryId}
                  >
                    {listCategory.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Field>
                  <FormHelperText>
                    {touched.categoryId && errors.categoryId}
                  </FormHelperText>
                </FormControl>

                <Box mb={2}></Box>
                <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                  Trạng thái sản phẩm:
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  error={touched.status && Boolean(errors.status)}
                >               
                  <Field
                    as={Select}
                    name="status"                   
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                  >
                    <MenuItem value="Available">Sẵn có</MenuItem>
                    <MenuItem value="UnAvailable">Không sẵn có</MenuItem>
                    <MenuItem value="OutOfStock">Hết hàng</MenuItem>
                  </Field>
                  <FormHelperText>
                    {touched.status && errors.status}
                  </FormHelperText>
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
    else return <LoadingComponentVersion2 open={data ? false : true} />;
  }
  
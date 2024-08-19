import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { Field, FieldArray, Form, Formik, FormikProps, FormikValues } from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LoadingComponentVersion2 from "../../components/common/loading/Backdrop";
import TableSelectProduct from "../../components/manager/Table/TableSelectProduct";
import { CategoryType } from "../../types/Category/CategoryType";
import CategoryAPI from "../../utils/CategoryAPI";
import ProductAPI from "../../utils/ProductAPI";
const validationSchema = Yup.object({
  name: Yup.string().required("*Tên sản phẩm không được để trống!"),
  description: Yup.string().required("*Mô tả không được để trống!"),
  stockPrice: Yup.number()
    .required("*Giá gốc không được để trống!")
    .min(1000, "Giá gốc không thể nhỏ hơn 1000 VNĐ!"),
  sellingPrice: Yup.number()
    .required("*Giá bán không được để trống!")
    .min(1000, "Giá bán không thể nhỏ hơn 1000 VNĐ!"),
  status: Yup.string().required("*Trạng thái không được để trống !"),
  categoryId: Yup.string().required("*Loại sản phẩm không được để trống !"),
  image: Yup.array().of(
    Yup.string().required("Hình ảnh không được để trống!")
  ),
});

export default function CreateCombo() {
  const navigate = useNavigate();
  const formikRef = React.useRef<FormikProps<FormikValues>>(null);
  const [listCategory, setListCategory] = React.useState<CategoryType[] | []>(
    []
  );
  const [listProductSelected, setListProductSelected] = React.useState<
    string[] | []
  >([]);
  const [totalSellingPriceOfSubProuducts, setTotalSellingPriceOfSubProuducts] =
    React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  console.log("check product", listProductSelected);
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

  return (
    <Paper sx={{ p: 10 }}>
      {isLoading && <LoadingComponentVersion2 open={isLoading} />}
      <Formik
        initialValues={{
          name: "",
          description: "",
          stockPrice: "",
          sellingPrice: "",
          status: "AVAILABLE",
          categoryId: "",
          image:[""]
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (listProductSelected.length === 0) {
            toast.error("Vui lòng chọn sản phẩm cho gói!");
            return;
          }
          try {
            const response = await ProductAPI.create({
              ...values,
              priority: 0,
              supProductId: listProductSelected,
              image: values.image.map((img: any)=>{return({
                imageURL: img
              })
            })
            });
            console.log({ response });
            toast.success("Tạo thành công !");
            navigate("/manager-manage-combo");
          } catch (error) {
            toast.error("Tạo thất bại !");
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              TẠO GÓI MỚI
            </Typography>
            <Field name={`name`}>
              {({ field, meta }: any) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "black", mb: 1 }}
                  >
                    Tên gói:
                  </Typography>
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    placeholder="Nhập tên gói ..."
                    fullWidth
                    autoComplete="off"
                    sx={{ minWidth: 456 }}
                    //   label="Name of the product"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ""}
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
                    helperText={meta.touched && meta.error ? meta.error : ""}
                  />
                </>
              )}
            </Field>
            <Box mb={2}></Box>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6} md={6}>
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
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {" "}
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
              </Grid>
            </Grid>

            <Box mb={2}></Box>
            <Grid container spacing={10}>
              <Grid item xs={12} sm={6} md={6}>
                {" "}
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
                  <FormHelperText>*Vui lòng chọn loại sản phẩm</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
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
                    <MenuItem value="AVAILABLE">Sẵn có</MenuItem>
                    <MenuItem value="UNAVAILABLE">Không sẵn có</MenuItem>
                    <MenuItem value="OUTOFSTOCK">Hết hàng</MenuItem>
                  </Field>
                  <FormHelperText>
                    * Vui lòng chọn trạng thái gói
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box mb={2}></Box>
            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>Nhập link ảnh:</Typography>
            <FieldArray name="image">
                    {({ push, remove }: any) => (
                      <Box>
                        {values.image.map(
                          (subService: any, index: any) => (
                            <Stack
                              direction={"row"}
                              alignItems={"center"}                            
                              spacing={1}
                              sx={{mb:3}}
                            >
                              <Field name={`image.${index}`}>
                                {({ field, meta }: any) => (
                                  <Box sx={{width:"100%"}}>                              
                                    <TextField
                                      {...field}
                                      label={`Ảnh ${index + 1}`}
                                      type="text"
                                      size="small"
                                      placeholder="Nhập url ảnh..."
                                      fullWidth
                                      autoComplete="off"
                                      // sx={{ minWidth: 500 }}
                                      error={meta.touched && !!meta.error}
                                      helperText={
                                        meta.touched && meta.error
                                          ? meta.error
                                          : ""
                                      }
                                    />
                                  </Box>
                                )}
                              </Field>
                              {/* hiển thị nút delete cho phần tử thứ 2 trở đi */}
                              {index > 0 && (
                                <
                                >
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon
                                      fontSize="inherit"
                                      color="error"
                                    />
                                  </IconButton>
                                </>
                                //   <Button onClick={()=>remove(index)}> delete {index + 1}</Button>
                              )}
                            </Stack>
                          )
                        )}

                        <Box>
                          <Button
                            startIcon={<AddOutlinedIcon />}
                            variant="outlined"
                            size="small"
                            onClick={() => push("")}     
                            color="info"
                          >
                            Thêm
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </FieldArray>
            {values.categoryId && (
              <Box sx={{ mt: 5, mb: 3 }}>
                <TableSelectProduct
                  listProductSelected={listProductSelected}
                  formikRef={formikRef}
                  setListProductSelected={setListProductSelected}
                  setTotalSellingPriceOfSubProuducts={
                    setTotalSellingPriceOfSubProuducts
                  }
                />
              </Box>
            )}
            {(typeof values.sellingPrice === "number" && listProductSelected.length > 0) &&
              totalSellingPriceOfSubProuducts < values.sellingPrice && (
                <Box>
                   <Alert severity="warning">
                      Giá tiền bán ra của gói lớn hơn tổng giá tiền các sản phẩm
                      mà bạn đã chọn! (
                      {values.sellingPrice.toLocaleString()} VNĐ {">"} {totalSellingPriceOfSubProuducts.toLocaleString()} VNĐ)
                    </Alert>
                </Box>
              )}
            <Stack direction={"row"} sx={{ mt: 4 }} spacing={3}>
              <Button
                fullWidth
                color="error"
                onClick={() => {
                  navigate(-1);
                }}
                variant="outlined"
              >
                Quay về
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
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

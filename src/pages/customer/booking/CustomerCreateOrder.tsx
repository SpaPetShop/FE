import {
  Alert,
  Avatar,
  Box,
  Card,
  CardMedia,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import {
  Field,
  FieldArray,
  Form,
  Formik,
  FormikProps,
  FormikValues,
} from "formik";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import petAPI from "../../../utils/PetAPI";
import { UserContext } from "../../../context/AuthContext";
import LoadingComponentVersion2 from "../../../components/common/loading/Backdrop";
import { PetType } from "../../../types/Pet/PetType";
import useCart from "../../../hook/useCart";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import { ComboType } from "../../../types/Combo/ComboType";
import { ProductType } from "../../../types/Product/ProductType";
import UserAPI from "../../../utils/UserAPI";
import { UserType } from "../../../types/User/UserType";

const validationSchema = Yup.object({
  name: Yup.string().required("*Tên sản phẩm không được để trống!"),
  description: Yup.string().required("*Mô tả không được để trống!"),
  stockPrice: Yup.number()
    .required("*Giá gốc không được để trống!")
    .min(1000, "Giá gốc không thể nhỏ hơn 1000 VNĐ!"),
  sellingPrice: Yup.number()
    .required("*Giá bán không được để trống!")
    .min(1000, "Giá bán không thể nhỏ hơn 1000 VNĐ!")
    .max(Yup.ref("stockPrice"), "*Giá bán phải nhỏ hơn hoặc bằng giá gốc!"),
  status: Yup.string().required("*Trạng thái không được để trống !"),
  categoryId: Yup.string().required("*Loại sản phẩm không được để trống !"),
  image: Yup.array().of(Yup.string().required("Hình ảnh không được để trống!")),
});
const listTimeSelect = [
//   "7:00",
//   "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
//   "17:00",
];
interface SelectProductType {
  productId: string
  quantity: number
  sellingPrice: number
}
export default function CustomerCreateOrder() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const currentUser = React.useContext(UserContext);
  const formikRef = React.useRef<FormikProps<FormikValues>>(null);
  const [listPet, setListPet] = React.useState<PetType[] | []>([]);
  const [listProductSelected, setListProductSelected] = React.useState<
  SelectProductType[] | []
  >([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listStaff, setListStaff] = React.useState<UserType[] | []>([]);
  const [typeOrder, setTypeOrder] = React.useState("MANAGERREQEUST");
  const handleChangeTypeOrder = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTypeOrder((event.target as HTMLInputElement).value);
  };
  console.log("check product", listProductSelected);
  const handleDeleteProduct = (data: ProductType) => {
    const isConfirmed = window.confirm(`Bạn muốn xóa sản phẩm ${data.name} ra khỏi giỏ hàng?`)
    if(cartItems && isConfirmed){
        const currentListProductInCart = [...cartItems.listProduct]
        const currentListComboInCart = [...cartItems.listCombo]
        const updateListProduct = currentListProductInCart.filter((product)=>product.id !== data.id)
        setCartItems((prev)=>({
          ...prev,
          listProduct: updateListProduct
        }))  
        localStorage.setItem("userDataCart",
          JSON.stringify({
          listProduct: updateListProduct,
        listCombo: currentListComboInCart
        })
      )
      toast.success("Xóa khỏi giỏ hàng thành công!")
      }
  }
  const handleDeleteCombo = (data: ComboType) => {
    const isConfirmed = window.confirm(`Bạn muốn xóa gói sản phẩm ${data.name} ra khỏi giỏ hàng?`)
    if(cartItems && isConfirmed){
        const currentListProductInCart = [...cartItems.listProduct]
        const currentListComboInCart = [...cartItems.listCombo]
        const updateListCombo = currentListComboInCart.filter((combo)=>combo.id !== data.id)
        setCartItems((prev)=>({
          ...prev,
          listCombo: updateListCombo
        }))  
        localStorage.removeItem('userDataCart')
        localStorage.setItem("userDataCart",
          JSON.stringify({
          listProduct: currentListProductInCart,
        listCombo: updateListCombo
        })
      )
      toast.success("Xóa khỏi giỏ hàng thành công!")
      }
  }
  React.useEffect(() => {
    const fetchListPet = async () => {
      try {
        setIsLoading(true);
        const data = await petAPI.getAllPet({
          page: 1,
          size: 100,
          CustomerId: currentUser.user?.id || null,
        });
        console.log({ data });
        setListPet(data.items);
      } catch (error) {
        console.log("Error get list Category: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchAllStaff = async () => {
        try {
          const data = await UserAPI.getAll({
            page: 1,
            size: 100,
            Role: "STAFF",
            Status:"ACTIVE"
          });
          setListStaff(data.items);
        } catch (error) {
          console.log("Error get list staff: ", error);
        }
      };

    fetchAllStaff();
    fetchListPet();
  }, [currentUser.user?.id]);


  return (
    <Paper sx={{ p: 10 }}>
      {isLoading && <LoadingComponentVersion2 open={isLoading} />}
      <Formik
        initialValues={{
          excutionDate: "",
          note: "",
          description: "",
          type: "",
          petId: "",
          staffId: "",
        }}
        innerRef={formikRef}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (listProductSelected.length === 0) {
            toast.error("Vui lòng chọn sản phẩm cho gói!");
            return;
          }
          try {
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
              ĐẶT LỊCH
            </Typography>{" "}
            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
              Chọn thú cưng*
            </Typography>
            {listPet.length > 0 ? (
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
                  {listPet.map((item) => (
                    <MenuItem value={item.id}>
                       <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Avatar src={item.image}/>
                        <Typography>{item.name}</Typography>
                       </Stack>
                    </MenuItem>
                  ))}
                </Field>
                <FormHelperText>*Vui lòng chọn thú cưng của bạn</FormHelperText>
              </FormControl>
            ) : (
              <Button>Thêm mới thú cưng của bạn</Button>
            )}
            <Box mb={2}></Box>
            <Field name={`description`}>
              {({ field, meta }: any) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "black", mb: 1 }}
                  >
                    Mô tả*
                  </Typography>
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    placeholder="Nhập mô tả ..."
                    fullWidth
                    multiline
                    minRows={4}
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
            <Field name={`note`}>
              {({ field, meta }: any) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "black", mb: 1 }}
                  >
                    Ghi chú
                  </Typography>
                  <TextField
                    {...field}
                    type="text"
                    size="small"
                    placeholder="Nhập ghi chú ..."
                    fullWidth
                    multiline
                    minRows={2}
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
            <Field name={`excutionDate`}>
              {({ field, meta, form }: any) => (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "black", mb: 1 }}
                  >
                    Thời gian thực hiện*
                  </Typography>
                  <Grid container spacing={3}>
                    {listTimeSelect.map((item) => (
                      <Grid item xs={1}>
                        <Chip
                          label={item}
                          key={item}
                          sx={{ p: 2 }}
                          color={values.excutionDate && values.excutionDate.includes(item) ? "success" : "default"}
                          variant="filled"
                          onClick={() => {
                            const todayString = moment().format("YYYY-MM-DDT");
                            form.setFieldValue(field.name, todayString + item);
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Field>
            <Box mb={2}></Box>
            {/* render item in cart  */}
            <Box>
            {cartItems.listCombo.length === 0 &&
        cartItems.listProduct.length === 0 && (
          <Typography variant="h5" align="center" sx={{mt:10}}>
            Hiện chưa có gói sản phẩm/sản phẩm nào trong giỏ hàng của bạn
          </Typography>
        )}
      {/* render list combo  */}
      {cartItems.listCombo.length > 0 && (
        <Box sx={{ p: 10 }}>
          <Typography variant="h5" sx={{ mb: 3 }} align="center">
            Danh sách các gói sản phẩm
          </Typography>
          <Grid container spacing={5}>
            {cartItems.listCombo.map((combo) => (
              <Grid item xs={6} key={combo.id}>
                <Card elevation={8}>
                  <Grid container spacing={2}>
                    {/* render ảnh combo */}
                    <Grid item xs={4}>
                      <Carousel
                      sx={{height:200}}
                        indicatorContainerProps={{
                          style: {
                            zIndex: 1,
                            marginTop: "-24px",
                            position: "relative",
                          },
                        }}
                      >
                        {combo.image.length > 0 ? (
                          combo.image.map((i, index) => (
                            <CardMedia
                              key={index}
                              component="img"
                              image={i.imageURL}
                              alt="combo img"
                              sx={{
                                objectFit: "cover",
                                width: "100%",
                                height: 200,
                              }}
                            />
                          ))
                        ) : (
                          <CardMedia
                            component="img"
                            image={
                              "https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
                            }
                            alt="combo img"
                            sx={{
                              objectFit: "cover",
                              width: "100%",
                              height: 200,
                            }}
                          />
                        )}
                      </Carousel>
                    </Grid>
                    {/* render ttin gói  */}
                    <Grid item xs={8}>
                      <Typography variant="h6" sx={{mt: 2, mb: 2, fontSize: 18}}>Tên gói: <strong>{combo.name}</strong></Typography>
                      <Typography variant="h6" sx={{mb: 2, fontSize: 18, height:30}}>
                        Mô tả: <strong>{combo.description || "Chưa có mô tả"}</strong>
                      </Typography>
                      <Typography variant="h6" sx={{mb: 2, fontSize: 18}}>
                        Giá bán: <strong>{combo.sellingPrice.toLocaleString()} VNĐ</strong>
                      </Typography>
                      <Button variant="contained" color="error"
                      onClick={()=>handleDeleteCombo(combo)}
                      >
                        Xóa
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* render list product  */}
      {cartItems.listProduct.length > 0 && (
        <Box sx={{ p: 10 }}>
          <Typography variant="h5" sx={{ mb: 3 }} align="center">
            Danh sách các gói sản phẩm
          </Typography>
          <Grid container spacing={5}>
            {cartItems.listProduct.map((product) => (
              <Grid item xs={6} key={product.id}>
                <Card elevation={8}>
                  <Grid container spacing={2}>
                    {/* render ảnh product */}
                    <Grid item xs={4}>
                      <Carousel
                      sx={{height:200}}
                        indicatorContainerProps={{
                          style: {
                            zIndex: 1,
                            marginTop: "-24px",
                            position: "relative",
                          },
                        }}
                      >
                        {product.image.length > 0 ? (
                          product.image.map((i, index) => (
                            <CardMedia
                              key={index}
                              component="img"
                              image={i.imageURL}
                              alt="combo img"
                              sx={{
                                objectFit: "cover",
                                width: "100%",
                                height: 200,
                              }}
                            />
                          ))
                        ) : (
                          <CardMedia
                            component="img"
                            image={
                              "https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
                            }
                            alt="combo img"
                            sx={{
                              objectFit: "cover",
                              width: "100%",
                              height: 200,
                            }}
                          />
                        )}
                      </Carousel>
                    </Grid>
                    {/* render ttin gói  */}
                    <Grid item xs={8}>
                      <Typography variant="h6" sx={{mt: 2, mb: 2, fontSize: 18}}>Tên sản phẩm: <strong>{product.name}</strong></Typography>
                      <Typography variant="h6" sx={{mb: 2, fontSize: 18}}>
                        Mô tả: <strong>{product.description || "Chưa có mô tả"}</strong>
                      </Typography>
                      <Typography variant="h6" sx={{mb: 2, fontSize: 18}}>
                        Giá bán: <strong>{product.sellingPrice.toLocaleString()} VNĐ</strong>
                      </Typography>
                      <Button variant="contained" color="error" onClick={()=>handleDeleteProduct(product)}>
                        Xóa
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Stack direction={"row"} justifyContent={"center"}>
      {(cartItems.listCombo.length + cartItems.listProduct.length) === 0 &&<Button variant="contained" sx={{mt: 3}} color="success" onClick={()=>navigate("/")}>Thêm sản phẩm</Button>}
      </Stack>
      </Box>
            <Box mb={2}></Box>
            <FormControl>
              <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
                Chọn nhân viên*
              </Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={typeOrder}
                onChange={handleChangeTypeOrder}
              >
                <Stack direction={"row"} justifyContent={"space-around"}>
                  <FormControlLabel
                    value="CUSTOMERREQEUST"
                    control={<Radio />}
                    label="Khác hàng tự chọn nhân viên"
                  />
                  <FormControlLabel
                    value="MANAGERREQEUST"
                    control={<Radio />}
                    label="Nhân viên do hệ thống chọn"
                  />
                </Stack>
              </RadioGroup>
            </FormControl>
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

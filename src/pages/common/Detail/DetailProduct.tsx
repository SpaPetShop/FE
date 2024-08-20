import { Box, Button, Chip, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import PetsIcon from "@mui/icons-material/Pets";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { UserContext } from "../../../context/AuthContext";
import { ProductType } from "../../../types/Product/ProductType";
import LoadingComponentVersion2 from "../../../components/common/loading/Backdrop";
import SubProductAPI from "../../../utils/SubProductAPI";
import { renderStatusProduct } from "../../../components/manager/SingleProduct";
import { ROLES } from "../../../routes/roles";
import { toast } from "react-toastify";
import useCart from "../../../hook/useCart";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useContext(UserContext);
  const { cartItems, setCartItems } = useCart();
  const [data, setData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddProductToCart = () => {
    if (data && cartItems) {
      const currentListProductInCart = [...cartItems.listProduct];
      const currentListComboInCart = [...cartItems.listCombo];
      const checkExists = currentListProductInCart.filter(
        (product) => product.id === data.id
      );
      if (checkExists.length > 0) {
        toast.warning("Sản phẩm này đã có trong giỏ hàng của bạn!");
        return;
      }
      currentListProductInCart.push(data);
      setCartItems((prev) => ({
        ...prev,
        listProduct: currentListProductInCart,
      }));
      localStorage.removeItem("userDataCart");
      localStorage.setItem(
        "userDataCart",
        JSON.stringify({
          listProduct: currentListProductInCart,
          listCombo: currentListComboInCart,
        })
      );
      toast.success("Thêm vào giỏ hàng thành công!");
    }
  };
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        setIsLoading(true);
        const data = await SubProductAPI.getDetail(id || "");
        console.log({ data }, "Product detail");
        setData(data);
      } catch (error) {
        console.log("Error get detail Product: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchAllProduct();
  }, [id]);
  return (
    <>
      {" "}
      <Typography sx={{ mt: 5, textAlign: "center" }} variant="h5">
        Chi tiết sản phẩm
      </Typography>
      <Box
        sx={{
          width: "100%",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {isLoading && <LoadingComponentVersion2 open={isLoading} />}
        <Card sx={{ width: "90%" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              {/* {" "}
            <CardMedia
              component="img"
              image="https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
              alt="img Product"              
              sx={{ objectFit: "cover", width:"100%", height:"100%" }}
            /> */}
              <Carousel
                sx={{ height: "100%" }}
                indicatorContainerProps={{
                  style: {
                    zIndex: 1,
                    marginTop: "-24px",
                    position: "relative",
                  },
                }}
              >
                {data && data?.image.length > 0 ? (
                  data.image.map((i, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={i.imageURL}
                      alt="Product img"
                      sx={{ objectFit: "cover", width: "100%", height: 400 }}
                    />
                  ))
                ) : (
                  <CardMedia
                    component="img"
                    image={
                      "https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
                    }
                    alt="Product img"
                    sx={{ objectFit: "cover", width: "100%", height: 400 }}
                  />
                )}
              </Carousel>
            </Grid>
            <Grid item xs={12} sm={6} md={12} lg={6}>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                  sx={{ mb: 3 }}
                >
                  {data?.name}
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ mb: 3, mt: 3 }}
                  spacing={1}
                >
                  <Typography gutterBottom variant="h6">
                    Loại:
                  </Typography>
                  <Chip
                    size="small"
                    icon={<PetsIcon color="disabled" />}
                    label={data?.category?.name}
                    style={{
                      backgroundColor: "#00e676",
                    }}
                  />
                </Stack>
                <Typography gutterBottom variant="h6">
                  Mô tả:{" "}
                  <strong>{data?.description || "Chưa có mô tả"} </strong>
                </Typography>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ mb: 3, mt: 3 }}
                  spacing={1}
                >
                  <Typography gutterBottom variant="h6">
                    Giá bán:
                  </Typography>
                  <Chip
                    label={`${data?.sellingPrice?.toLocaleString()} VNĐ`}
                    style={{
                      backgroundColor: "#00e5ff",
                    }}
                  />
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ mb: 3, mt: 3 }}
                  spacing={1}
                >
                  <Typography gutterBottom variant="h6">
                    Trạng thái:
                  </Typography>
                  {renderStatusProduct(data?.status || "")}
                </Stack>
                {currentUser.user?.role === ROLES.CUSTOMER && (
                  <Stack direction={"row"} spacing={2}>
                    <Button
                      sx={{ width: 240, mt: 3 }}                    
                      variant="contained"
                      style={{
                        backgroundColor: "#ffa733",
                        color: "black",
                      }}
                      onClick={handleAddProductToCart}
                      startIcon={<AddShoppingCartIcon />}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    {/* <Button
                      sx={{ width: 240, mt: 3 }}
                      style={{
                        backgroundColor: "#ffa733",
                        color: "black",
                      }}
                      variant="contained"
                      startIcon={<CheckCircleOutlineOutlinedIcon />}
                      onClick={() => navigate(`/booking`)}
                    >
                      Mua ngay
                    </Button> */}
                  </Stack>
                )}
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
}

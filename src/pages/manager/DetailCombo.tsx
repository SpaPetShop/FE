import { Box, Button, Chip, Grid, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponentVersion2 from "../../components/common/loading/Backdrop";
import { renderStatusCombo } from "../../components/manager/SingleCombo";
import { ComboType } from "../../types/Combo/ComboType";
import ProductAPI from "../../utils/ProductAPI";
import Carousel from "react-material-ui-carousel";
import { UserContext } from "../../context/AuthContext";
import PetsIcon from '@mui/icons-material/Pets';
import { ROLES } from "../../routes/roles";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { toast } from "react-toastify";
import useCart from "../../hook/useCart";

export default function DetailCombo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {cartItems, setCartItems} = useCart()
  const currentUser = useContext(UserContext)
  const [data, setData] = useState<ComboType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleAddComboToCart = () =>{
    if(data && cartItems){
      const currentListProductInCart = [...cartItems.listProduct]
      const currentListComboInCart = [...cartItems.listCombo]
      const checkExists = currentListComboInCart.filter((combo)=>combo.id === data.id)
      if(checkExists.length > 0){
        toast.warning("Gói sản phẩm này đã có trong giỏ hàng của bạn!")
        return
      } 
      currentListComboInCart.push(data)
      setCartItems((prev)=>({
        ...prev,
        listCombo: currentListComboInCart
      }))  
      localStorage.removeItem('userDataCart')
      localStorage.setItem("userDataCart",
        JSON.stringify({
        listProduct: currentListProductInCart,
      listCombo: currentListComboInCart
      })
    )
    toast.success("Thêm vào giỏ hàng thành công!")
    }
  }
  useEffect(() => {
    const fetchAllCombo = async () => {
      try {
        setIsLoading(true);
        const data = await ProductAPI.getDetail(id || "");
        console.log({ data }, "combo detail");
        setData(data);
      } catch (error) {
        console.log("Error get detail Combo: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchAllCombo();
  }, [id]);
  return (
    <> <Typography sx={{mt: 5, textAlign:"center", mb: 3}} variant="h5">Chi tiết gói sản phẩm</Typography>
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        mb: 10
      }}
    >
      {isLoading && <LoadingComponentVersion2 open={isLoading} />}
      <Card sx={{ width: "90%" }}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* {" "}
            <CardMedia
              component="img"
              image="https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
              alt="img combo"              
              sx={{ objectFit: "cover", width:"100%", height:"100%" }}
            /> */}
            <Carousel
              sx={{ minHeight:500 }}
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
                    alt="combo img"
                    sx={{ objectFit: "cover", width: "100%", height: 500 }}
                  />
                ))
              ) : (
                <CardMedia
                  component="img"
                  image={
                    "https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
                  }
                  alt="combo img"
                  sx={{ objectFit: "cover", width: "100%", height: 500}}
                />
              )}
            </Carousel>
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={12}>
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
              <Grid container spacing={3}>
                {data?.supProducts?.map((item, index) => (
                  <Grid item xs={12} md={6} lg={3} key={item.id}>
                    {" "}
                    <Box
                      sx={{
                        backgroundImage:
                          index === 0 || index % 2 === 0
                            ? "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)"
                            : "linear-gradient(to right, #7ff3fd, #82f6fc, #86f8fb, #8bfbf9, #8ffdf8)",
                        p: 2,
                        borderRadius: 5,
                      }}
                    >
                      <Typography
                        sx={{ lineHeight: 3, fontSize: 16 }}
                        variant="body2"
                        align="center"
                      >
                        Sản phẩm {index + 1}
                      </Typography>
                      <Typography
                        sx={{ lineHeight: 3, fontSize: 14 }}
                        variant="body2"
                      >
                        Tên sản phẩm: {item.name}
                      </Typography>
                      <Typography
                        sx={{ lineHeight: 3, fontSize: 14 }}
                        variant="body2"
                      >
                        Giá gốc sản phẩm: {item.stockPrice.toLocaleString()} VNĐ
                      </Typography>
                      <Typography
                        sx={{ lineHeight: 3, fontSize: 14 }}
                        variant="body2"
                      >
                        Giá bán sản phẩm: {item.stockPrice.toLocaleString()} VNĐ
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
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
              icon={<PetsIcon
              color="disabled"
              />}
                label={data?.category?.name}
                style={{
                  backgroundColor: "#00e676",
                }}
              />
            </Stack>
            <Typography
               gutterBottom variant="h6"
              >
                Mô tả: <strong>{data?.description || "Chưa có mô tả"} </strong>
              </Typography>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ mb: 3, mt: 3 }}
                spacing={1}
              >
                <Typography gutterBottom variant="h6">
                  Giá gói gốc:
                </Typography>
                <Chip
                  label={`${data?.stockPrice?.toLocaleString()} VNĐ`}
                  style={{
                    backgroundColor: "#ff6d00",
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
                  Giá gói bán:
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
                {renderStatusCombo(data?.status || "")}
              </Stack>

             {currentUser.user?.role === ROLES.MANAGER &&  <Button
                sx={{ width: 200, mt: 3 }}
                style={{
                  backgroundColor: "#ffa733",
                  color: "black",
                }}
                variant="contained"
                onClick={() =>
                  navigate(`/manager-manage-combo/update-combo/${id}`)
                }
              >
                Cập nhật
              </Button>}
              {currentUser.user?.role === ROLES.CUSTOMER &&  
              <Stack direction={"row"} spacing={2}>
              <Button
                 sx={{ width: 240, mt: 3 }}                    
                 variant="contained"
                 style={{
                   backgroundColor: "#ffa733",
                   color: "black",
                 }}
                onClick={
                  handleAddComboToCart
                }
                startIcon={<AddShoppingCartIcon/>}
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
                startIcon={<CheckCircleOutlineOutlinedIcon/>}
                onClick={() =>
                  navigate(`/booking`)
                }
              >
               Mua ngay
              </Button> */}
              </Stack>
              }
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
    </>
  );
}

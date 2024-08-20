import React from "react";
import useCart from "../../hook/useCart";
import { Box, Button, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ProductType } from "../../types/Product/ProductType";
import { toast } from "react-toastify";
import { ComboType } from "../../types/Combo/ComboType";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, setCartItems } = useCart();
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
  return (
    <Box sx={{ width: "100%", minHeight:"50vh" }}>
      <Typography
        variant="h4"
        sx={{ mt: 5, color: "#ff6d00", fontWeight: 700 }}
        align="center"
      >
        Giỏ hàng của tôi
      </Typography>

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
      {(cartItems.listCombo.length + cartItems.listProduct.length) > 0 &&<Button variant="contained"   sx={{mt: 3, mb: 5}} color="success" onClick={()=>navigate("/booking")}>Đặt lịch ngay</Button>}
      </Stack>
      
    </Box>
  );
};

export default CartPage;

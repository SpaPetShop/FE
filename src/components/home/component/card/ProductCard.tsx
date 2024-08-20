import {
  Button,
  CardActionArea,
  CardActions,
  Chip,
  Grid,
  Stack,
  Tooltip,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import Carousel from "react-material-ui-carousel";
import { ProductType } from "../../../../types/Product/ProductType";
import { toast } from "react-toastify";
import useCart from "../../../../hook/useCart";
export type ProductCardProps = {
  data: ProductType;
};
export const renderStatusProduct = (status: string) => {
  switch (status) {
    case "AVAILABLE":
      return (
        <Tooltip title={"Đang hoạt động"}>
          <CheckCircleOutlinedIcon
            fontSize="small"
            style={{ color: "#00e676", marginTop: "4px" }}
          />
        </Tooltip>
      );
    case "UNAVAILABLE":
      return (
        <Tooltip title={"Ngưng hoạt động"}>
          <HighlightOffIcon
            fontSize="small"
            style={{ color: "#ffd600", marginTop: "4px" }}
          />
        </Tooltip>
      );
    case "OUTOFSTOCK":
      return (
        <Tooltip title={"Hết hàng"}>
          <DoNotDisturbIcon
            fontSize="small"
            style={{ color: "#ff1744", marginTop: "4px" }}
          />
        </Tooltip>
      );
    default:
      return (
        <Chip sx={{ minWidth: 120 }} label={"Chưa xác định"} color="error" />
      );
  }
};
export default function ProductCard({ data }: ProductCardProps) {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
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
      toast.success("Thêm vào sản phẩm vào giỏ hàng thành công!");
    }
  };

  return (
    <Grid item xs={4} sm={3} md={3} lg={2}>
      <Card elevation={8} sx={{ maxWidth: 400 }}>
        <CardActionArea onClick={() => navigate(`/detail-product/${data.id}`)}>
          <Carousel
            sx={{ margin: "auto", border: "none", minHeight: 200 }}
            indicatorContainerProps={{
              style: {
                zIndex: 1,
                marginTop: "-24px",
                position: "relative",
              },
            }}
          >
            {data.image.length > 0 ? (
              data.image.map((i, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height={200}
                  image={i.imageURL}
                  alt="Product img"
                  sx={{ objectFit: "cover" }}
                />
              ))
            ) : (
              <CardMedia
                component="img"
                height={200}
                image={"/logo.png"}
                alt="Product img"
                sx={{ objectFit: "cover" }}
              />
            )}
          </Carousel>
          <CardContent>
            <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
              {renderStatusProduct(data.status)}
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ height: 60, overflow: "hidden", fontSize: 18 }}
              >
                {data.name}
              </Typography>
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ mb: 3, mt: 3 }}
              spacing={1}
            >
              <Typography gutterBottom variant="h6" sx={{ fontSize: 16 }}>
                Loại:
              </Typography>
              <Chip
                size="small"
                icon={<PetsIcon color="disabled" />}
                label={data.category.name}
                style={{
                  backgroundColor: "#00e676",
                }}
              />
            </Stack>

            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ mb: 3, mt: 3 }}
              spacing={1}
            >
              <Typography gutterBottom variant="h6" sx={{ fontSize: 16 }}>
                Giá gốc:
              </Typography>
              <Chip
                label={`${data?.stockPrice?.toLocaleString()} VNĐ`}
                size="small"
                style={{
                  backgroundColor: "#ff6d00",
                }}
              />
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ mt: 3 }}
              spacing={1}
            >
              <Typography gutterBottom variant="h6" sx={{ fontSize: 16 }}>
                Giá bán:
              </Typography>
              <Chip
                size="small"
                label={`${data?.sellingPrice?.toLocaleString()} VNĐ`}
                style={{
                  backgroundColor: "#00e5ff",
                }}
              />
            </Stack>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="warning"
            onClick={handleAddProductToCart}
            startIcon={<AddShoppingCartIcon />}
          >
            Thêm vào giỏ hàng
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

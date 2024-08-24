import {
  Alert,
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponentVersion2 from "../../components/common/loading/Backdrop";
import { OrderType } from "../../types/Order/OrderType";
import OrderAPI from "../../utils/OrderAPI";
import { renderStatusOrder } from "./ListOrder";
import ModalUpdateOrder from "../../components/manager/Modal/Order/ModalUpdateOrder";
import { toast } from "react-toastify";
import ModalCancelOrder from "../../components/manager/Modal/Order/ModalCancelOrder";

export default function DetailOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log({ id });
  const [data, setData] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelOrder, setIsCancelOrder] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [isAssignStaff, setIsAssignStaff] = useState(false);
  const handleSelectStaff = () => {
    console.log("zo");
    setIsAssignStaff(true);
  };
  const handleCancelOrder = async () => {
    const isConfirmed = window.confirm("Bạn muốn hủy đơn hàng này ?");
    if (isConfirmed && data) {
      try {
        await OrderAPI.update(data.orderId, { status: "CANCELED" });
        toast.success("Hủy đơn hàng thành công.");
        fetchOrder();
      } catch (error) {
        toast.error("Hủy đơn hàng thất bại!");
      }
    }
  };
  const fetchOrder = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await OrderAPI.getDetail(id || "");
      console.log({ data }, "Order detail");
      setData(data);
      const createdDateTime = moment(data.createdDate);

      // Lấy thời gian hiện tại
      const now = moment();

      // Tính toán sự khác biệt giữa thời gian hiện tại và thời gian createdDate
      const duration = moment.duration(now.diff(createdDateTime));

      // Kiểm tra xem sự khác biệt có lớn hơn 30 phút không
      const isOver30Minutes = duration.asMinutes() > 30;
      setIsShowAlert(isOver30Minutes);
    } catch (error) {
      console.log("Error get detail Order: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);
  useEffect(() => {
    if (id) fetchOrder();
  }, [fetchOrder, id]);
  return (
    <Paper sx={{ p: 5 }}>
      {isLoading && <LoadingComponentVersion2 open={isLoading} />}
      {data && (
        <Box>
          <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={8}
              sx={{
                border: "2px solid #e0e0e0",
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                p: 2,
              }}
            >
              <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                THÔNG TIN KHÁCH HÀNG & NHÂN VIÊN
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 19, mb: 2 }}
                    align="center"
                  >
                    Khách hàng
                  </Typography>
                  <Stack direction={"row"} alignItems={"center"} spacing={2}>
                    <Avatar
                      src={data.userInfo.image || "/logo.png"}
                      sx={{ width: 50, height: 50 }}
                      alt="avatar"
                    />
                    <Box>
                      <Typography sx={{ fontSize: 17, mb: 1 }}>
                        Họ tên: <strong>{data.userInfo.fullName}</strong>
                      </Typography>
                      <Typography sx={{ fontSize: 17 }}>
                        Số điện thoại:{" "}
                        <strong>
                          {data.userInfo.phoneNumber || "Chưa có thông tin"}
                        </strong>
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 19, mb: 2 }}
                    align="center"
                  >
                    Nhân viên
                  </Typography>
                  {data.staff ? (
                    <>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar
                          src={data.staff.image || "/logo.png"}
                          sx={{ width: 50, height: 50 }}
                          alt="avatar"
                        />
                        <Box>
                          <Typography sx={{ fontSize: 17, mb: 1 }}>
                            Họ tên: <strong>{data?.staff?.fullName}</strong>
                          </Typography>
                          <Typography sx={{ fontSize: 17 }}>
                            Số điện thoại:{" "}
                            <strong>
                              {data?.staff?.phoneNumber || "Chưa có thông tin"}
                            </strong>
                          </Typography>
                        </Box>
                      </Stack>
                      {data?.staff &&
                        data.status === "PAID" &&
                        data.type === "MANAGERREQUEST" &&
                        isAssignStaff === false && (
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            alignItems={"center"}
                          >
                            <Box
                              sx={{
                                textDecoration: "underline",
                                color: "#4fc3f7",
                                // "&:hover": {
                                //   color: "blue",
                                // },
                                cursor: "pointer",
                                mt: 1,
                              }}
                              onClick={handleSelectStaff}
                            >
                              Đổi nhân viên
                            </Box>
                          </Box>
                        )}
                    </>
                  ) : (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{ fontSize: 17, mb: 1, textAlign: "center" }}
                      >
                        Hiện chưa có nhân viên nhận đơn hàng này!
                      </Typography>
                      {data?.staff &&
                        data.status === "PAID" &&
                        data.type === "MANAGERREQUEST" &&
                        isAssignStaff === false && (
                          <Box
                            sx={{
                              textDecoration: "underline",
                              color: "#4fc3f7",
                              // "&:hover": {
                              //   color: "blue",
                              // },
                              cursor: "pointer",
                            }}
                            onClick={handleSelectStaff}
                          >
                            Chỉ định nhân viên
                          </Box>
                        )}
                    </Box>
                  )}
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    {data && isAssignStaff && (
                      <ModalUpdateOrder
                        data={data}
                        fetchOrder={fetchOrder}
                        open={isAssignStaff}
                        setOpen={setIsAssignStaff}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ height: "3px", bgcolor: "#00e5ff", mt: 1 }}></Box>
              {/* render ttin pet */}
              <Typography
                variant="h6"
                sx={{ fontSize: 19, mb: 2, mt: 1 }}
                align="center"
              >
                Thông tin thú cưng
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {" "}
                  <CardMedia
                    image={
                      data.petInfor.image ||
                      "https://img5.thuthuatphanmem.vn/uploads/2021/12/27/hinh-nen-thu-cung-chat-luong-cao-2k-cho-may-tinh_050621563.jpg"
                    }
                    component={"img"}
                    alt="img pet"
                    sx={{ maxWidth: "100%", height: 200, borderRadius: 2.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  {" "}
                  <Typography variant="h5" sx={{ fontSize: 16, mb: 5, mt: 4 }}>
                    Tên Thú Cưng: <strong>{data.petInfor.name}</strong>
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ mb: 3, mt: 3 }}
                    spacing={1}
                  >
                    <Typography gutterBottom variant="h6" sx={{ fontSize: 16 }}>
                      Loại Thú Cưng:
                    </Typography>
                    <Chip
                      size="small"
                      icon={<PetsIcon color="disabled" />}
                      label={data.petInfor.typePet.name}
                      style={{
                        backgroundColor: "#00e676",
                        color: "#fff",
                      }}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              sx={{
                border: "2px solid #e0e0e0",
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                p: 2,
              }}
            >
              {/* render ttin order */}
              <Box>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                  THÔNG TIN ĐƠN HÀNG
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Mã hóa đơn: <strong>{data.invoiceCode}</strong>
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Loại đơn hàng:{" "}
                  <strong>
                    {data.type === "CUSTOMERREQUEST"
                      ? "Khách hàng chọn nhân viên"
                      : "Quản lí chọn nhân viên"}
                  </strong>
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Ngày tạo đơn:{" "}
                  <strong>
                    {data.createdDate
                      ? moment(data.createdDate).format("DD/MM/YYYY - HH:mm")
                      : "Chưa có thông tin"}
                  </strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Ngày dự kiến hoàn thành đơn:{" "}
                  <strong>
                    {data.estimatedCompletionDate
                      ? moment(data.estimatedCompletionDate).format(
                          "DD/MM/YYYY - HH:mm"
                        )
                      : "Chưa có thông tin"}
                  </strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Ngày thực thi đơn:{" "}
                  <strong>
                    {data.excutionDate
                      ? moment(data.excutionDate).format(
                          "DD/MM/YYYY - HH:mm"
                        )
                      : "Chưa có thông tin"}
                  </strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Ngày hoàn thành đơn:{" "}
                  <strong>
                    {data.completedDate
                      ? moment(data.completedDate).format(
                          "DD/MM/YYYY - HH:mm"
                        )
                      : "Chưa có thông tin"}
                  </strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Mô tả:{" "}
                  <strong>{data.description || "Chưa có thông tin"}</strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Tổng thời gian làm:{" "}
                  <strong>
                    {data.timeWork
                      ? data.timeWork + " giờ"
                      : "Chưa có thông tin"}
                  </strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Tổng giá tiền:{" "}
                  <strong>{data.finalAmount.toLocaleString()} VNĐ</strong>
                </Typography>

                <Typography variant="h6" sx={{ fontSize: 17, mb: 2 }}>
                  Trạng thái: {renderStatusOrder(data.status)}
                </Typography>

                {isShowAlert && data.status === "UNPAID" && (
                  <Box sx={{ mt: 2 }}>
                    <Alert severity="warning">
                      Hóa đơn này đã tạo được 30 phút nhưng vẫn chưa thanh toán!
                    </Alert>
                  </Box>
                )}
                {data.status !== "COMPLETED" && (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 5 }}
                    onClick={() => setIsCancelOrder(true)}
                  >
                    Hủy Đơn Hàng
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              {" "}
              {/* render list combo */}
              <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                Thông tin sản gói/sản phẩm
              </Typography>
              <Grid container spacing={2}>
                {data.productList.map((product, index) =>
                  product.productId ? (
                    <Grid key={product.productId} item xs={12} md={6} lg={6}>
                      <Box
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #7ff3fd, #82f6fc, #86f8fb, #8bfbf9, #8ffdf8)",
                          p: 2,
                          borderRadius: 5,
                        }}
                      >
                        <Typography sx={{ fontSize: 17, mb: 1 }}>
                          Tên gói: <strong>{product.productName}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: 17 }}>
                          Giá bán:{" "}
                          <strong>
                            {product.sellingPrice.toLocaleString()} VNĐ
                          </strong>
                        </Typography>
                        <Typography></Typography>
                        <Typography></Typography>
                      </Box>
                    </Grid>
                  ) : (
                    <Grid key={product.supProductId} item xs={12} md={6} lg={6}>
                      <Box
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
                          p: 2,
                          borderRadius: 5,
                        }}
                        key={product.supProductId}
                      >
                        <Typography>
                          Tên sản phẩm: {product.supProductName}
                        </Typography>
                        <Typography>
                          Giá bán: {product.sellingPrice.toLocaleString()} VNĐ
                        </Typography>
                        <Typography></Typography>
                        <Typography></Typography>
                      </Box>
                    </Grid>
                  )
                )}
              </Grid>
            </Grid>
            <Grid item xs={6} sx={{ borderLeft: "1px solid" }}>
              <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                Danh sách ghi chú
              </Typography>
              {/* render note */}
              {!data.note.length && (
                <Typography sx={{ textAlign: "center", fontSize: 20 }}>
                  Hiện chưa có ghi chú cho đơn hàng này!
                </Typography>
              )}
              {data.note.length > 0 &&
                data.note.map((note, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography sx={{ mb: 1 }}>
                      Ngày tạo:{" "}
                      {moment(note.createDate).format("DD/MM/YYYY - HH:mm")}
                    </Typography>
                    <Typography>Nội dung: {note.description}</Typography>
                  </Box>
                ))}
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            {" "}
            <Button
              variant="contained"
              // color="primary"
              sx={{ mt: 3 }}
              style={{
                borderRadius: 35,
                backgroundColor: "#33eaff",
                color: "black",
                fontSize: "15px",
              }}
              onClick={() => navigate(-1)}
            >
              Quay về
            </Button>
          </Box>
        </Box>
      )}
      {data && (
        <ModalCancelOrder
          data={data}
          fetchOrder={fetchOrder}
          open={isCancelOrder}
          setOpen={setIsCancelOrder}
        />
      )}
    </Paper>
  );
}

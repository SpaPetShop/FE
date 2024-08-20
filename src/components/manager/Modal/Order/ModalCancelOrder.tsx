import { DialogActions, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";
import { OrderType } from "../../../../types/Order/OrderType";
import OrderAPI from "../../../../utils/OrderAPI";
import LoadingComponentVersion2 from "../../../common/loading/Backdrop";

type ModalCancelOrderProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchOrder: () => void;
  data: OrderType | null;
};
export default function ModalCancelOrder({
  open,
  setOpen,
  fetchOrder,
  data,
}: ModalCancelOrderProps) {
  const [reason, setReason] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = async () => {
    setOpen(false);
    try {
      const response = await OrderAPI.update(data?.orderId || "", {note: reason, status:"CANCELED" });
      console.log({ response });
      toast.success("Cập nhật thành công");
      fetchOrder();
    } catch (error: any) {
      toast.error(
        error?.response?.data ? error?.response?.data?.error : "Cập nhật thất bại"
      );
    }
  };
  if (data)
    return (
      <>
        <Dialog open={open} fullWidth maxWidth="sm">
          <DialogTitle
            id="alert-dialog-title"
            sx={{
              textAlign: "center",
              backgroundImage:
                "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
            }}
          >
            {"XÁC NHẬN HỦY ĐƠN HÀNG!"}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mt: 2, mb: 2, fontSize: 18 }} align="center">
              Bạn muốn hủy đơn hàng của khách{" "}
              <strong>{data.userInfo.fullName}</strong> này ?
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
              Lí do hủy đơn hàng*
            </Typography>
            <TextField
              value={reason}
              type="text"
              multiline
              minRows={3}
              placeholder="Nhập lí do..."
              fullWidth
              autoComplete="off"
              onChange={(e)=>setReason(e.target.value)}
              error={reason ? false : true}
              helperText={
                reason ? "" : "*Vui lòng ghi rõ nội dung hủy đơn hàng!"
              }
            />
          </DialogContent>
          <DialogActions>
            <Stack direction={"row"} sx={{ mt: 2 }} spacing={1}>
              <Button
                size="small"
                color="info"
                onClick={handleClose}
                variant="outlined"
              >
                Thoát
              </Button>
              <Button
                size="small"
                variant="contained"
                autoFocus
                color="error"
                type="submit"
                onClick={handleCancel}
                disabled={reason ? false : true}
              >
                Xác nhận
              </Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </>
    );
  else return <LoadingComponentVersion2 open={data ? false : true} />;
}

import { DialogActions, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { toast } from "react-toastify";
import { CustomerRequestType } from "../../../../types/CustomerRequest/CustomerRequestType";
import LoadingComponentVersion2 from "../../../common/loading/Backdrop";
import CustomerRequestAPI from "../../../../utils/CustomerRequestAPI";

type ModalConfirmCustomerRequestProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchCustomerRequest: () => void;
  data: CustomerRequestType | null;
  type: boolean;
};
export default function ModalConfirmCustomerRequest({
  open,
  setOpen,
  fetchCustomerRequest,
  data,
  type,
}: ModalConfirmCustomerRequestProps) {
  const [reason, setReason] = React.useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = async () => {
   
    try {
      let submitData = {}
      if(reason) submitData = {note: reason, status:type ? "ACCEPT" : "REJECT" }
      else submitData = {status:type ? "ACCEPT" : "REJECT"  }
      await CustomerRequestAPI.update(data?.id || "", submitData);
      toast.success("Cập nhật thành công");
      setOpen(false);
      setReason("")
      fetchCustomerRequest();
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ? error?.response?.data?.error
          : "Cập nhật thất bại"
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
            {type ? "XÁC NHẬN" : "TỪ CHỐI"}
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mt: 2, mb: 2, fontSize: 18 }} align="center">
              <strong>
                {type
                  ? `Bạn đồng ý duyệt yêu cầu của khách hàng ${data.userId.fullName}`
                  : `Bạn KHÔNG đồng ý duyệt yêu cầu của khách hàng ${data.userId.fullName} ?`}
              </strong>
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "black", mb: 1 }}>
              Lí do {type ? "" : "*"}
            </Typography>
            {type ? (
              <TextField
                value={reason}
                type="text"
                multiline
                minRows={3}
                placeholder="Nhập lí do..."
                fullWidth
                autoComplete="off"
                onChange={(e) => setReason(e.target.value)}
              />
            ) : (
              <TextField
                value={reason}
                type="text"
                multiline
                minRows={3}
                placeholder="Nhập lí do..."
                fullWidth
                autoComplete="off"
                onChange={(e) => setReason(e.target.value)}
                error={reason ? false : true}
                helperText={
                  reason ? "" : "*Vui lòng ghi rõ nội dung hủy đơn hàng!"
                }
              />
            )}
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
              {type ? (
                <Button
                  size="small"
                  variant="contained"
                  autoFocus
                  color="success"
                  type="submit"
                  onClick={handleCancel}
                >
                  Xác nhận
                </Button>
              ) : (
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
              )}
            </Stack>
          </DialogActions>
        </Dialog>
      </>
    );
  else return <LoadingComponentVersion2 open={data ? false : true} />;
}

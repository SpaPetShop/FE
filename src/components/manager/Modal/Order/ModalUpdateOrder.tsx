import {
  Autocomplete,
  Box,
  DialogActions,
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
import OrderAPI from "../../../../utils/OrderAPI";
import { OrderType } from "../../../../types/Order/OrderType";
import LoadingComponentVersion2 from "../../../common/loading/Backdrop";
import UserAPI from "../../../../utils/UserAPI";
import { UserType } from "../../../../types/User/UserType";

const validationSchema = Yup.object({
  staffId: Yup.string().required("*Vui lòng chọn nhân viên!"),
});

type ModalUpdateOrderProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchOrder: () => void;
  data: OrderType;
};
export default function ModalUpdateOrder({
  open,
  setOpen,
  fetchOrder,
  data,
}: ModalUpdateOrderProps) {
  const [listStaff, setListStaff] = React.useState<UserType[] | []>([]);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const fetchAllStaff = async () => {
      try {
        const data = await UserAPI.getAll({
          page: 1,
          size: 100,
          Role: "STAFF",
        });
        setListStaff(data.items);
      } catch (error) {
        console.log("Error get list staff: ", error);
      }
    };
    fetchAllStaff();
  }, []);
  if (data)
    return (
      <>
        <Dialog open={open} fullWidth maxWidth={"sm"}>
          <Formik
            initialValues={{
              note: "",
              staffId: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values);
              try {
                const submitData = {
                  ...values,
                  status: data.status,
                  description: data.description
                };
                const response = await OrderAPI.update(
                  data.orderId,
                  submitData
                );
                console.log({ response });
                setOpen(false);
                toast.success("Cập nhật thành công !");
                fetchOrder();
              } catch (error) {
                toast.error("Cập nhật thất bại !");
              }
            }}
          >
            {({ values }) => (
              <Form>
                <DialogTitle
                  id="alert-dialog-title"
                  sx={{ textAlign: "center" }}
                >
                  {"CHỌN NHÂN VIÊN THỰC HIỆN ĐƠN HÀNG"}
                </DialogTitle>
                <DialogContent>
                  <Field name={`staffId`}>
                    {({ field, form, meta }: any) => (
                      <Autocomplete
                        {...field}
                        options={listStaff.map((option, index) => ({
                          ...option,
                          index,
                        }))}
                        size="small"
                        isOptionEqualToValue={(
                          option: UserType,
                          value: UserType
                        ) => option.fullName === value.fullName}
                        getOptionLabel={(option: UserType) =>
                          option ? option.fullName : ""
                        }
                        value={
                          listStaff.find(
                            (option) => option?.id === field.value
                          ) || ""
                        }
                        onChange={(event, newValue: UserType) => {
                          console.log({ newValue });
                          form.setFieldValue(
                            `staffId`,
                            newValue ? newValue.id : ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="dense"
                            label="Nhân Viên"
                            error={meta.touched && !!meta.error}
                            helperText={
                              meta.touched && meta.error ? meta.error : ""
                            }
                          />
                        )}
                      />
                    )}
                  </Field>

                  <Box mb={3}></Box>
                  <Field name={`note`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1 }}
                        >
                          Ghi chú:
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          size="small"
                          placeholder="Nhập ghi chú..."
                          fullWidth
                          multiline
                          minRows={4}
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

import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { OrderType } from "../../../../types/Order/OrderType";
import { UserType } from "../../../../types/User/UserType";
import TaskAPI from "../../../../utils/TaskAPI";
import UserAPI from "../../../../utils/UserAPI";

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
          Status:"ACTIVE"
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
  <Box width={300}>
      <Formik
        initialValues={{
          staffId: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          try {
            // Chưa có nhân viên chỉ định thì chị định nhân viên vào bằng cách tạo mới task cho nhân viên đó
            if (data?.staff) {
              const responseTask = await TaskAPI.getAll({
                page: 1,
                size: 5,
                OrderId: data.orderId,
              });
              const currentTask = responseTask[0];
              await TaskAPI.update(currentTask.id, {
                accountId: values.staffId,
              });
              setOpen(false);
              toast.success("Cập nhật thành công !");
            }
            // nếu đã có nhân viên chỉ định trước đó thì cập nhật lại task đó cho nhân viên khác
            // Bước 1: Lấy ra cái task hiện tại theo order hiện tại
            // Bước 2: Cập nhật lại task đó cho 1 nhân viên mới
            else {
              const submitData = {
                orderId: data.orderId,
                accountId: values.staffId,
              };
              const response = await TaskAPI.create(submitData);
              console.log({ response });
              setOpen(false);
              toast.success("Cập nhật thành công !");
            }
            fetchOrder();
          } catch (error: any) {
            toast.error(error?.response?.data ? error?.response?.data?.error : "Cập nhật thất bại !");
          }
        }}
      >
        {({ values }) => (
          <Form>
            <Field name={`staffId`}>
              {({ field, form, meta }: any) => (
                <Autocomplete
                  {...field}
                  options={listStaff.map((option, index) => ({
                    ...option,
                    index,
                  }))}
                  sx={{ mt: 2, minWidth: 300 }}
                  size="small"
                  isOptionEqualToValue={(option: UserType, value: UserType) =>
                    option.fullName === value.fullName
                  }
                  getOptionLabel={(option: UserType) =>
                    option ? option.fullName : ""
                  }
                  value={
                    listStaff.find((option) => option?.id === field.value) || ""
                  }
                  onChange={(event, newValue: UserType) => {
                    console.log({ newValue });
                    form.setFieldValue(`staffId`, newValue ? newValue.id : "");
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="dense"
                      label="Nhân Viên"
                      error={meta.touched && !!meta.error}
                      helperText={meta.touched && meta.error ? meta.error : ""}
                    />
                  )}
                />
              )}
            </Field>

            <Stack direction={"row"} sx={{ mt: 1 }} spacing={3}>
              <Button
                fullWidth
                color="error"
                size="small"
                style={{
                  borderRadius: 35,
                }}
                onClick={() => {
                  handleClose();
                  setOpen(false);
                }}
                variant="outlined"
              >
                Hủy
              </Button>
              <Button
                fullWidth
                style={{
                  borderRadius: 35,
                  backgroundColor: "#00e676",
                  // fontSize: "15px",
                }}
                variant="contained"
                autoFocus
                size="small"
                type="submit"
              >
                Đồng ý
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      </Box>
    );
  else return <></>;
}

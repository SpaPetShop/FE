import {
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
import PetAPI from "../../../../utils/PetAPI";
import { TPetType } from "../../../../types/Pet/PetType";
import LoadingComponentVersion2 from "../../../common/loading/Backdrop";

const validationSchema = Yup.object({
  name: Yup.string().required("*Tên thể loại không được để trống!"),
  description: Yup.string().required("*Mô tả không được để trống!"),
});

type ModalUpdatePetProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fetchAllPetType: () => void;
  data: TPetType;
};
export default function ModalUpdatePet({
  open,
  setOpen,
  fetchAllPetType,
  data,
}: ModalUpdatePetProps) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (data) setChecked(data.status === "ACTIVE" ? true : false);
  }, [data]);
  if (data)
    return (
      <>
        <Dialog open={open}>
          <Formik
            initialValues={{
              name: data.name || "",
              description: data.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const submitData = {
                  ...values,
                  status: checked ? "ACTIVE" : "INACTIVE",
                };
                const response = await PetAPI.updateTypePet(
                  data.id,
                  submitData
                );
                console.log({ response });
                setOpen(false);
                toast.success("Cập nhật thành công !");
                fetchAllPetType();
              } catch (error) {
                toast.error("Cập nhật thất bại !");
              }
            }}
          >
            {({ values }) => (
              <Form>
                <DialogTitle
                  id="alert-dialog-title"
                  sx={{
                    textAlign: "center",
                    backgroundImage:
                      "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)",
                  }}
                >
                  {"CẬP NHẬT LOẠI THÚ CƯNG"}
                </DialogTitle>
                <DialogContent>
                  <Field name={`name`}>
                    {({ field, meta }: any) => (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "black", mb: 1, mt: 2 }}
                        >
                          Tên thể loại*
                        </Typography>
                        <TextField
                          {...field}
                          type="text"
                          size="small"
                          placeholder="Nhập tên thể loại ..."
                          fullWidth
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
                  <Box mb={3}></Box>
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
                          multiline
                          minRows={3}
                          placeholder="Nhập mô tả..."
                          fullWidth
                          autoComplete="off"
                          //   label="Name of the product"
                          error={meta.touched && !!meta.error}
                          helperText={
                            meta.touched && meta.error ? meta.error : ""
                          }
                        />
                      </>
                    )}
                  </Field>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Typography>Trạng thái: </Typography>
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                      color="success"
                    />
                  </Box>
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

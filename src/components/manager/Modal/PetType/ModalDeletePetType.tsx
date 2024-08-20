import {
    DialogActions,
    Stack,
    Typography
  } from "@mui/material";
  import Button from "@mui/material/Button";
  import Dialog from "@mui/material/Dialog";
  import DialogContent from "@mui/material/DialogContent";
  import DialogTitle from "@mui/material/DialogTitle";
  import * as React from "react";
  import { toast } from "react-toastify";
  import { TPetType } from "../../../../types/Pet/PetType";
  import PetAPI from "../../../../utils/PetAPI";
  import LoadingComponentVersion2 from "../../../common/loading/Backdrop";
    
    type ModalDeletePetProps = {
      open: boolean;
      setOpen: React.Dispatch<React.SetStateAction<boolean>>;
      fetchAllPetType: () => void;
      data: TPetType | null;
    };
    export default function ModalDeletePet({
      open,
      setOpen,
      fetchAllPetType,
      data,
    }: ModalDeletePetProps) {
      const handleClose = () => {
        setOpen(false);
      };
      const handleDelete = async() => {
          setOpen(false);
          try {
            const response = await PetAPI.deleteTypePet(data?.id || "")  
            console.log({response});
            toast.success("Xóa thành công")
            fetchAllPetType() 
          } catch (error: any) {
            toast.error(error?.response?.data ? error?.response?.data?.error : "Xóa thất bại")  
          }
      }
      if (data)
        return (
          <>
            <Dialog open={open} fullWidth maxWidth="sm">
        
                    <DialogTitle
                      id="alert-dialog-title"
                      sx={{ 
                        textAlign: "center",
                        backgroundImage: "linear-gradient(to right top, #ffab91, #ffbc8e, #ffce8f, #ffe193, #fff59d)"  
                       }}
                    >
                      {"XÁC NHẬN XÓA!"}
                    </DialogTitle>
                    <DialogContent>
                     <Typography sx={{mt:1}}>Bạn muốn xóa loại thú cưng <strong>{data.name}</strong> này ?</Typography>
                    </DialogContent>
                    <DialogActions>
                      <Stack direction={"row"} sx={{ mt: 2 }} spacing={1}>
                        <Button
                          fullWidth
                          color="info"
                          onClick={handleClose}
                          variant="outlined"
                        >
                          Hủy
                        </Button>
                        <Button
                          fullWidth
                          variant="contained"
                          autoFocus
                          color="error"
                          type="submit"
                          onClick={handleDelete}
                        >
                          Xóa
                        </Button>
                      </Stack>
                    </DialogActions>
            </Dialog>
          </>
        );
      else return <LoadingComponentVersion2 open={data ? false : true} />;
    }
    
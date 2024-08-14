import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Pagination,
  Stack,
  TextField
} from "@mui/material";
import * as React from "react";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SingleService from "../../components/manager/SingleService";
import { ServiceType } from "../../types/ServiceType";
import ModalCreateService from "../../components/manager/Modal/ModalCreateNewService";

const dataServices: ServiceType[] = [
  {
    id: "1",
    createdDate: "8/8/2024",
    name: "Tắm rửa thú cưng",
    status: "ACTIVE",
    price:100000
  },
  {
    id: "2",
    createdDate: "8/8/2024",
    name: "Cắt móng thú cưng",
    status: "ACTIVE",
    price:100000
  },
  {
    id: "3",
    createdDate: "8/8/2024",
    name: "Massage thú cưng",
    status: "ACTIVE",
    price:100000
  },
  {
    id: "4",
    createdDate: "8/8/2024",
    name: "Tỉa lông thú cưng",
    status: "ACTIVE",
    price:100000
  },
  {
    id: "5",
    createdDate: "8/8/2024",
    name: "Diệt bọ thú cưng",
    status: "ACTIVE",
    price:100000
  }

];

export default function ListService() {
  const [page, setPage] = React.useState(1);
  const [listService, setListService] = React.useState<ServiceType[] | []>(dataServices);
  const [showModalCreate, setShowModalCreate] = React.useState(false)

  const startIndex = (page - 1) * 24;
  const endIndex = startIndex + 24;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchName = (name: string) => {
    if (name) setListService(dataServices.filter((service) => service.name.includes(name)));
    else setListService(dataServices.slice(startIndex, endIndex));
  };
  
  React.useEffect(() => {
    const newData = dataServices.slice(startIndex, endIndex);
    setListService(newData);
  }, [page, startIndex, endIndex]);

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{mb:3}}
      >
      <TextField
        size="small"
        placeholder="Nhập tên dịch vụ ..."
        label="Tìm kiếm"
        onChange={(e) => handleSearchName(e.target.value)}
        sx={{ width: "345px" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
       <Button variant="contained" color="info" startIcon={<SellOutlinedIcon/>}
        onClick={()=>setShowModalCreate(true)}
        >
          Thêm dịch vụ
        </Button>
        </Stack>
      <Grid container spacing={3} sx={{ minHeight: 600 }}>
        {listService.map((service, index) => (
          <SingleService key={index} service={service} />
        ))}
      </Grid>
      <Stack
        spacing={2}
        direction={"row"}
        justifyContent={"center"}
        sx={{ width: "100%", p: 3 }}
      >
        <Pagination
          color="secondary"
          count={Math.ceil(dataServices.length / 20)}
          page={page}
          onChange={handleChangePage}
        />
      </Stack>

      <ModalCreateService
      open={showModalCreate}
      setOpen={setShowModalCreate}
      />
    </Box>
  );
}

import { CardActionArea, Chip, Grid, Stack, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ComboType } from "../../types/Combo/ComboType";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
export type SingleComboProps = {
  data: ComboType;
};

export default function SingleCombo({ data }: SingleComboProps) {
  const navigate = useNavigate();
  const renderStatus = (status: string) => {
    switch (status) {
      case "Available":
        return ( 
          <Tooltip title={"Đang hoạt động"}>
              <CheckCircleOutlinedIcon fontSize="small" style={{color:"#00e676", marginTop:"4px"}}/>
          </Tooltip>
        );
      case "UnAvailable":
        return (
          <Tooltip title={"Ngưng hoạt động"}>
          <HighlightOffIcon fontSize="small" style={{color:"#ffd600", marginTop:"4px"}}/>
      </Tooltip>
        );
      case "OutOfStock":
        return ( <Tooltip title={"Hết hàng"}>
          <DoNotDisturbIcon fontSize="small" style={{color:"#ff1744", marginTop:"4px"}}/>
      </Tooltip>);
      default:
        return (
          <Chip sx={{ minWidth: 120 }} label={"Chưa xác định"} color="error" />
        );
    }
  };

  return (
    <Grid item xs={4} sm={3} md={3} lg={3}>
      <Card
        sx={{ maxWidth: 400 }}
        onClick={() => navigate(`/manager-manage-combo/${data.id}`)}
      >
        <CardActionArea>
          <CardMedia
            sx={{ height: 200, objectFit: "cover" }}
            image="/logo.png"
            title="Combo Image"
          />
          <CardContent>
            <Stack direction={"row"} alignItems={"flex-start"} spacing={1}>
          {renderStatus(data.status)} 
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{height: 60, overflow: "hidden", fontSize: 18 }}
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
              <Typography gutterBottom variant="h6" sx={{fontSize:16}}>
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
              sx={{ mb: 3, mt: 3 }}
              spacing={1}
            >
              <Typography gutterBottom variant="h6" sx={{fontSize:16}}>
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
      </Card>
    </Grid>
  );
}

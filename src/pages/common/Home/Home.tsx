import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, styled } from "@mui/material";
import MuiTab, { TabProps } from "@mui/material/Tab";
import React from "react";
import FeaturedTitle from "../../../components/common/highlight/FeaturedTitle";
import PetImageGallery from "../../../components/home/component/gallery/PetImageGallery";
import ListComboForCustomer from "../../../components/home/component/ListComboForCustomer";
import ListProductForCustomer from "../../../components/home/component/ListProductForCustomter";
import "./Home.css";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
}));
const Home: React.FC = () => {
  const [value, setValue] = React.useState<string>("COMBO");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="container">
      <FeaturedTitle
        title={"BOSS DỊCH VỤ"}
        subtitle={"Các loại dịch vụ chăm sóc cho thú cưng của bạn"}
      />

      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            ml: 10,
            mb: 3,
          }}
        >
          <Tab
            value="COMBO"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TabName sx={{ fontWeight: 700, fontSize: 18 }}>
                  Gói sản phẩm
                </TabName>
              </Box>
            }
          />
          <Tab
            value="PRODUCT"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TabName sx={{ fontWeight: 700, fontSize: 18 }}>
                  Sản phẩm
                </TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value="COMBO">
          <ListComboForCustomer />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="PRODUCT">
          <ListProductForCustomer />
        </TabPanel>
      </TabContext>
      <FeaturedTitle
        title={"KHOẢNH KHẮC THÚ CƯNG"}
        subtitle={"PET LIKE US AND SO WILL YOU"}
      />
      <PetImageGallery />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import petspaImage from '../../assets/images/adminImage/funny-mastiff-puppy-towel-on-600nw-2280747877.png';
import AdminDashboardAPI from '../../utils/AdminDashboardAPI';

const cardStyles = {
  backgroundColor: '#f5f5f5',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  padding: '16px',
  textAlign: 'center',
  color: '#4caf50',
};

const iconStyles = {
  fontSize: '48px',
  color: '#ff7043', // Pet spa-friendly orange color
};

const TotalUser: React.FC<{ total: number }> = ({ total }) => (
  <Card sx={cardStyles}>
    <CardContent>
      <PeopleIcon sx={iconStyles} />
      <Typography variant="h6">Total Managers</Typography>
      <Typography variant="h3">{total}</Typography>
    </CardContent>
  </Card>
);

const TotalOrder: React.FC<{ total: number }> = ({ total }) => (
  <Card sx={cardStyles}>
    <CardContent>
      <PetsIcon sx={iconStyles} />
      <Typography variant="h6">Total Orders</Typography>
      <Typography variant="h3">{total}</Typography>
    </CardContent>
  </Card>
);

const TotalCustomer: React.FC<{ total: number }> = ({ total }) => (
  <Card sx={cardStyles}>
    <CardContent>
      <GroupIcon sx={iconStyles} />
      <Typography variant="h6">Total Customers</Typography>
      <Typography variant="h3">{total}</Typography>
    </CardContent>
  </Card>
);

const TotalStaff: React.FC<{ total: number }> = ({ total }) => (
  <Card sx={cardStyles}>
    <CardContent>
      <GroupIcon sx={iconStyles} />
      <Typography variant="h6">Total Staff</Typography>
      <Typography variant="h3">{total}</Typography>
    </CardContent>
  </Card>
);

const ImageCard: React.FC = () => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <img
        src={petspaImage}
        alt="Pet Spa"
        style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
      />
    </CardContent>
  </Card>
);

const TotalDashBoard: React.FC = () => {
  const [totalManager, setTotalManager] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);

  const fetchAllUser = async () => {
    try {
      const response: any = await AdminDashboardAPI.getAllCountAcount();
      const { tolalAccount, accountByRole } = response;
      setTotalManager(accountByRole.MANAGER || 0);
      setTotalCustomers(accountByRole.USER || 0);
      setTotalStaff(accountByRole.STAFF || 0);
    } catch (error) {
      console.error('Failed to fetch account data:', error);
    }
  };

  const fetchAllOrder = async () => {
    try {
      const response: any = await AdminDashboardAPI.getAllCountOder();
      const { tolalOrders } = response;
      setTotalOrders(tolalOrders || 0);
    } catch (error) {
      console.error('Failed to fetch order data:', error);
    }
  };

  useEffect(() => {
    fetchAllUser();
    fetchAllOrder();
  }, []);

  return (
    <Box sx={{ padding: '24px', backgroundColor: '#e8f5e9', borderRadius: '20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TotalUser total={totalManager} />
            </Grid>
            <Grid item>
              <TotalOrder total={totalOrders} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <TotalCustomer total={totalCustomers} />
            </Grid>
            <Grid item>
              <TotalStaff total={totalStaff} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotalDashBoard;

import { Box } from '@mui/material'
import React from 'react'
import RevenueChart from './RevenueChart'
import TotalCustomer from './ToltalCustomer'

const Dashboard = () => {
  return (
   
     <Box sx={{bgcolor:"white", width:"100%", height:"100%"}}>
      <div>
       
        <RevenueChart/>
        <TotalCustomer/>
        
      </div>
       </Box>
  )
}

export default Dashboard
import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export interface CustomTabsInterface {
  icon: React.JSX.Element,
  title: string,
  subtitle: string,
}

interface SuperAdminDashboardTabsInterface {
  tabs: CustomTabsInterface[];
  activeTab: number;
  onChangeTab: (tab: number) => void;
}

const SuperAdminDashboardTabs: React.FC<SuperAdminDashboardTabsInterface> = ({tabs, activeTab, onChangeTab}) => {

  return(
    <Grid
      container
      direction={'row'}
      gap={'24px'}
      marginTop={'50px'}
    >
      {tabs.map((val, index) => (
        <Grid
          onClick={() => onChangeTab(index)}
          key={`tab-${index}`}
          display={'flex'}
          direction={'row'}
          gap={'16px'}
          sx={{
            cursor: 'pointer'
          }}
        >
          <Box
            width={'40px'}
            height={'40px'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={'6px'}
            sx={{
              backgroundColor: activeTab === index ? '#F7C113' : '#4B465C14',
              color: activeTab === index ? '#fff' : 'rgba(75, 70, 92, 0.9)'
            }}
          >
            {val.icon}
          </Box>
          <Grid
            direction={'column'}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                color: 'rgba(75, 70, 92, 0.9)'
              }}
            >
              {val.title}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                color: 'rgba(75, 70, 92, 0.5)'
              }}
            >
              {val.subtitle}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default SuperAdminDashboardTabs;
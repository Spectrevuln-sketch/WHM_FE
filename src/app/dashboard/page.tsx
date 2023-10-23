'use client';

import CardContainer from "@/components/layout/dashboard/cards/CardContainer";
import OverviewCard from "@/components/layout/dashboard/cards/OverviewCard";
import { Grid } from "@mui/material";
import React from "react";

const Dashboard = () => {

  const [overviewData, setOverviewData] = React.useState([
    {
      label: 'monday',
      value: 50,
    },
    {
      label: 'tuesday',
      value: 100,
    },
    {
      label: 'wednesday',
      value: 80,
    },
    {
      label: 'thursday',
      value: 60,
    },
    {
      label: 'friday',
      value: 130,
    },
    {
      label: 'saturday',
      value: 70,
    },
    {
      label: 'sunday',
      value: 90,
    },
  ])

  return(
    <Grid
      container
      direction={'column'}
      sx={{
        //
      }}
    >
      <CardContainer>
        <OverviewCard
          data={overviewData}
          activeIndex={0}
          materialServiceRequest={1000}
          deliveringProduct={500}
          productDelivered={200}
        />
      </CardContainer>
      <Grid></Grid>
    </Grid>
  );
}

export default Dashboard
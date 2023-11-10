'use client';

import CardContainer from "@/components/cards/CardContainer";
import ListHistoryCard from "@/components/cards/ListHistoryCard";
import OverviewCard from "@/components/cards/OverviewCard";
import { Grid } from "@mui/material";
import React from "react";

const Dashboard = () => {

  const [overviewData] = React.useState([
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

      {/* top */}
      <CardContainer>
        <OverviewCard
          data={overviewData}
          activeIndex={0}
          materialServiceRequest={1000}
          deliveringProduct={500}
          productDelivered={200}
        />
      </CardContainer>

      {/* bottom */}
      <Grid
      container
      direction={'row'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '32px',
        gap: '24px'
      }}
      >
        <CardContainer>
          <ListHistoryCard
            title="Material Service Request"
            amount={1000}
            data={[
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Close',
                color: 0
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Open',
                color: 1
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Close',
                color: 0
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Close',
                color: 0
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Close',
                color: 0
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Close',
                color: 0
              },
            ]}
          />
        </CardContainer>
        <CardContainer>
          <ListHistoryCard
            title="Delivering Product"
            amount={500}
            data={[
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivering',
                color: 2
              },
            ]}
          />
        </CardContainer>
        <CardContainer>
          <ListHistoryCard
            title="Product Delivered"
            amount={200}
            data={[
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
              {
                title: 'Direct Source',
                subtitle: 'Direct link click',
                link: '/dashboard',
                label: 'Delivered',
                color: 3
              },
            ]}
          />
        </CardContainer>
      </Grid>

    </Grid>
  );
}

export default Dashboard
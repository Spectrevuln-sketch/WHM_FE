'use client';

import { dashboardIcons } from "@/assets/icon/dashboard";
import { Grid } from "@mui/material";

import DataCard from "@/components/cards/DataCard/DataCard";
import ListActivityCard from "@/components/cards/ListActivityCard";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip
} from 'chart.js';
import React from "react";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    BarElement,
    Title,
    Tooltip,
    Legend
   );

const Dashboard = () : React.ReactNode => {

  // const [overviewData] = React.useState([
  //   {
  //     label: 'monday',
  //     value: 50,
  //   },
  //   {
  //     label: 'tuesday',
  //     value: 100,
  //   },
  //   {
  //     label: 'wednesday',
  //     value: 80,
  //   },
  //   {
  //     label: 'thursday',
  //     value: 60,
  //   },
  //   {
  //     label: 'friday',
  //     value: 130,
  //   },
  //   {
  //     label: 'saturday',
  //     value: 70,
  //   },
  //   {
  //     label: 'sunday',
  //     value: 90,
  //   },
  // ])

  // const [chartDataMsr, setChartDataMsr] = useState({
  //   labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], 
  //   datasets: [
  //     {
  //       label: 'close',
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: '#F94144',
  //       backgroundColor: '#F94144',
  //     },
  //     {
  //       label: 'open',
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: '#28C76F',
  //       backgroundColor: '#28C76F',
  //     }
  //   ]
  // });
  // const [chartDataDelivering, setChartDataDelivering] = useState({
  //   labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'], 
  //   datasets: [
  //     {
  //       label: 'close',
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: '#365486',
  //       backgroundColor: '#365486',
  //     },
  //     {
  //       label: 'open',
  //       data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //       borderColor: '#F9C74F',
  //       backgroundColor: '#F9C74F',
  //     }
  //   ]
  // });

  return(
    <Grid
      container
      direction={'column'}
      sx={{
        //
      }}
    >

      {/* overview data */}
      <Grid
        container
        direction={'row'}
        sx={{
          marginBottom: '26px',
          gap: '22px'
        }}
      >
        <DataCard
          variant="primary"
          amount={1205}
          title="Total Material Services Request"
          image={dashboardIcons.dashboardMsrIcon}
          percentage={30}
          data={[
            {
              title: "Open",
              amount: 1000,
              color: "#28C76F"
            },
            {
              title: "Close",
              amount: 205,
              color: "#F94144"
            },
          ]}
        />
        <DataCard
          variant="primary"
          amount={500}
          title="Total Delivering Product"
          image={dashboardIcons.dashboardDeliveringIcon}
          percentage={30}
          data={[
            {
              title: "Non Vendor",
              amount: 250,
              color: "#365486"
            },
            {
              title: "Vendor",
              amount: 250,
              color: "#F7C113"
            },
          ]}
        />
        <DataCard
          variant="secondary"
          amount={200}
          title="Total Product Delivered"
          image={dashboardIcons.dashboardDeliveredIcon}
        />
        <DataCard
          variant="secondary"
          amount={1205}
          title="Total Inventory"
          image={dashboardIcons.dashboardMsrIcon}
        />
      </Grid>

      {/* activity */}
      <Grid
      container
      direction={'row'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '32px',
        gap: '24px'
      }}
      >
        <ListActivityCard
          title="List Activity Today"
          amount={12000}
          data={[
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
          ]}
        />
        <ListActivityCard
          title="List Activity Today"
          amount={12000}
          data={[
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Waiting for Approval from PR',
              color: '#F94144',
              date: 'Now',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Approval from PM',
              color: '#F3722C',
              date: '10 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivering',
              color: '#F8961E',
              date: '15 Okt 2023',
              msrNo: '10213921039',
            },
            {
              requestBy: 'Andi Samsul',
              status: 'Delivered',
              color: '#F9C74F',
              date: '22 Okt 2023',
              msrNo: '10213921039',
            },
          ]}
        />
      </Grid>

    </Grid>
  );
}

export default Dashboard
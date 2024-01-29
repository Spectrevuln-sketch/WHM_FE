import { dashboardIcons } from '@/assets/icon/dashboard';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import './OverviewCard.css';

interface data {
  label: string;
  value: number;
}
interface OverviewCardInterface {
  data: data[];
  activeIndex: number;
}

const OverviewCard: React.FC<OverviewCardInterface> = ({data, activeIndex}) => {

  const chartColor = data.map((a, index) => index == activeIndex ? '#365486' : '#365486');
  
  return (
    <Grid
      container
      direction={'column'}
    >

      {/* top */}
      <Grid
        container
        direction={'row'}
      >

        {/* top left */}
        <Grid
          container
          direction={'column'}
          sx={{
            width: '20%'
          }}
        >

          <Box>
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: 500,
                lineHeight: '24px',
                color: 'rgba(75, 70, 92, 0.9)'
              }}
            >
              Product Report
            </Typography>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'rgba(75, 70, 92, 0.5)'
              }}
            >
              Weekly report
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: '37px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  fontWeight: 500,
                  lineHeight: '24px',
                  color: 'rgba(75, 70, 92, 0.9)'
                }}
              >
                Product Delivered
              </Typography>
              <Image src={dashboardIcons.boxCheckedIcon} alt='box-checked-icon' width={34} height={34} />
            </Box>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'rgba(75, 70, 92, 0.5)'
              }}
            >
              You informed of this week <br/> compared to last week
            </Typography>
          </Box>

        </Grid>

        {/* top right */}
        <Box
        sx={{
          width: '80%',
          height: '200px',
        }}>
          <ResponsiveContainer>
            <BarChart data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}} >
              <XAxis dataKey="label" />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {
                    data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColor[index % 20]} />
                    ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

      </Grid>

      {/* bottom */}
      {/* <CardContainer>

        <Grid
          container
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
           sx={{
            width: '300px'
           }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '21px',
                color: '#4B465C',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              Material Services Request
            </Typography>
            <Typography
              sx={{
                marginTop: '10px',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '30px',
                color: '#4B465C'
              }}
            >
              {materialServiceRequest}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '300px'
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '21px',
                color: '#4B465C',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Box
                component={'span'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  padding: '4px',
                  backgroundColor: colorStyle.delivering.light
                }}
              >
                <AccessTime sx={{color: colorStyle.delivering.main}} />
              </Box>
              Delivering Product
            </Typography>
            <Typography
              sx={{
                marginTop: '10px',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '30px',
                color: '#4B465C'
              }}
            >
              {deliveringProduct}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '300px'
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '21px',
                color: '#4B465C',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Box
                component={'span'}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '26px',
                  height: '26px',
                  borderRadius: '6px',
                  padding: '4px',
                  backgroundColor: colorStyle.delivering.light
                }}
              >
                <CheckCircleOutline sx={{color: colorStyle.delivering.main}} />
              </Box>
              Product Delivered
            </Typography>
            <Typography
              sx={{
                marginTop: '10px',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '30px',
                color: '#4B465C'
              }}
            >
              {productDelivered}
            </Typography>
          </Box>
        </Grid>
        
      </CardContainer> */}

    </Grid>
  );
}

export default OverviewCard
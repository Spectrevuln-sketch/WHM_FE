import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import StatusChip from "../chips/StatusChip";

interface data {
  title: string;
  subtitle: string;
  link: string;
  status: string;
}

interface ListHistoryCardInterface {
  data: data[];
  title: string;
  amount: number;
}

const ListHistoryCard: React.FC<ListHistoryCardInterface> = ({data, title, amount}) => {
  return(
    <Grid
      container
      direction={'column'}
    >

      {/* title & subtitle */}
      <Box>
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 500,
            lineHeight: '21px',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '20px',
          }}
        >
          {amount}
        </Typography>
      </Box>

      {/* data */}
      <Box
        sx={{
          marginTop: '10px'
        }}
      >
        {
          data.map((val, index) => (
            <Grid
              key={`status-list-${title}-${index}`}
              container
              direction={'row'}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginY: '14px',
                width: '100%'
              }}
            >

              {/* left */}
              <Grid
                direction={'column'}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '15px',
                    lineHeight: '21px',
                    color: 'rgba(75, 70, 92, 0.9)'
                  }}
                >
                  {val.title}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '20px',
                    color: 'rgba(75, 70, 92, 0.5)'
                  }}
                >
                  {val.subtitle}
                </Typography>
              </Grid>

              {/* right */}
              <Box>
                <StatusChip status={val.status} short/>
              </Box>

            </Grid>
          ))
        }
      </Box>

    </Grid>
  )
}

export default ListHistoryCard;
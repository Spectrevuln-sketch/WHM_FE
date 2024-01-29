import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import CardContainer from "./CardContainer";

interface data {
  requestBy: string;
  status: string;
  color: string;
  msrNo: string;
  date: string;
}

interface ListActivityCardInterface {
  data?: data[];
  title: string;
  amount: number;
}

const ListActivityCard = (props: ListActivityCardInterface) : React.ReactNode => {

  const {
    title = "",
    amount = 0,
    data = [],
  } = props
  return(
    <CardContainer maxWidth="30%">
      <Grid
        container
        direction={'column'}
      >
        {/* title */}
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 400,
          }}
        >
          {amount} - Activity
        </Typography>

        {/* data */}
        <Box
          marginTop={'10px'}
          overflow={'scroll'}
          maxHeight={'400px'}
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
                  justifyContent: 'flex-start',
                  marginY: '14px',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* left */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '6px',
                    height: '100%',
                    backgroundColor: val.color
                  }}
                />
                {/* right */}
                <Grid
                  display={'flex'}
                  direction={'column'}
                  marginLeft={'14px'}
                  gap={'8px'}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '15px',
                      lineHeight: '21px',
                      color: 'rgba(75, 70, 92, 0.9)'
                    }}
                  >
                    Request by: <strong>{val.requestBy}</strong>
                  </Typography>
                  <Typography
                    fontSize={'13px'}
                    fontWeight={600}
                    color={val.color}
                  >
                    {val.status}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '13px',
                      lineHeight: '20px',
                      color: 'rgba(75, 70, 92, 0.5)'
                    }}
                  >
                    MSR {val.msrNo} - {val.date}
                  </Typography>
                </Grid>

              </Grid>
            ))
          }
        </Box>

      </Grid>
    </CardContainer>
  )
}

export default ListActivityCard;
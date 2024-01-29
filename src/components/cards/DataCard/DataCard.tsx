import { Circle } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import CardContainer from "../CardContainer";
import { DataCardType } from "./DataCardTypes";

const DataCard = (props: DataCardType): React.ReactNode => {

  const {
    variant = "primary",
    percentage = 0,
    amount = 0,
    title = "",
    image = "",
    data = [
      {
        amount : 0,
        color : "",
        title : "",
      }
    ],
    ...otherProps
  } = props

  return(
    <CardContainer>
      {
        variant === "primary" &&
        <Grid
          container
          direction={'row'}
          gap={'10px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          {...otherProps}
        >
          {/* left */}
          <Grid
            direction={'column'}
            gap={'8px'}
            justifyContent={'center'}
          >
            <Box
              display={'flex'}
              flexDirection={'row'}
              gap={'8px'}
            >
              <Image src={image} alt={`data-card-image-${title}`} width={20} height={20}/>
              <Typography
                fontSize={'12px'}
                fontWeight={400}
              >
                {percentage}%
              </Typography>
            </Box>
            <Typography
              fontSize={'32px'}
              fontWeight={500}
            >
              {amount.toLocaleString()}
            </Typography>
            <Typography
              fontSize={'15px'}
              fontWeight={500}
            >
              {title}
            </Typography>
          </Grid>
          {/* right */}
          <Grid
            direction={'column'}
            gap={'8px'}
            justifyContent={'center'}
          >
            {
              data.map((val, index) => (
                <Grid
                  key={`data-right-${index}`}
                  container
                  direction={'row'}
                  gap={'8px'}
                  alignItems={'flex-start'}
                >
                  <Circle sx={{
                    marginTop: '4px',
                    color: val.color,
                    fontSize: '9px',
                    height: '9px',
                    width: '9px',
                  }}
                  />
                  <Grid
                    direction={'column'}
                    gap={'3px'}
                  >
                    <Typography
                      fontSize={'12px'}
                      fontWeight={400}
                    >
                      {val.title}
                    </Typography>
                    <Typography
                      fontSize={'15px'}
                      fontWeight={500}
                    >
                      {val.amount}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      }
      {
        variant === "secondary" &&
        <Grid
          container
          direction={'row'}
          gap={'10px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          {...otherProps}
        >
          {/* left */}
          <Grid
            direction={'column'}
            gap={'8px'}
            justifyContent={'center'}
          >
            <Typography
              fontSize={'32px'}
              fontWeight={500}
            >
              {amount.toLocaleString()}
            </Typography>
            <Typography
              fontSize={'15px'}
              fontWeight={500}
            >
              {title}
            </Typography>
          </Grid>
          {/* right */}
          <Image src={image} alt={`data-card-image-${title}`} width={43} height={43}/>
        </Grid>
      }
    </CardContainer>
  )
}

export default DataCard;
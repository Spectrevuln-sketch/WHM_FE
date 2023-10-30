'use client';

import colorStyle from "@/styles/colorStyle";
import { Box, Typography } from "@mui/material";
import React from "react";

export enum ChipColor{
  'red' = 0,
  'green' = 1,
  'blue' = 2,
  'yellow' = 3,
}
interface StatusChipInterface {
  label: string;
  color: ChipColor;
}

const StatusChip: React.FC<StatusChipInterface> = ({label, color}) => {

  switch (color) {
    case 0:
      return(
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: '4px',
            paddingX: '10px',
            paddingY: '5px',
            backgroundColor: colorStyle.waitingForApproval.light
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '14px',
              color: colorStyle.waitingForApproval.main
            }}
          >
            {label}
          </Typography>
        </Box>
      )
      break;
  
    case 1:
      return(
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: '4px',
            paddingX: '10px',
            paddingY: '5px',
            backgroundColor: colorStyle.approval.light
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '14px',
              color: colorStyle.approval.main
            }}
          >
            {label}
          </Typography>
        </Box>
      )
      break;
  
    case 2:
      return(
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: '4px',
            paddingX: '10px',
            paddingY: '5px',
            backgroundColor: colorStyle.delivering.light
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '14px',
              color: colorStyle.delivering.main
            }}
          >
            {label}
          </Typography>
        </Box>
      )
      break;
  
    case 3:
      return(
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: '4px',
            paddingX: '10px',
            paddingY: '5px',
            backgroundColor: colorStyle.delivered.light
          }}
        >
          <Typography
            sx={{
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: '14px',
              color: colorStyle.delivered.main
            }}
          >
            {label}
          </Typography>
        </Box>
      )
      break;
  
    default:
      break;
  }
}

export default StatusChip;
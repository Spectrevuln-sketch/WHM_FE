'use client';

import colorStyle from "@/styles/colorStyle";
import { Box, Typography } from "@mui/material";
import React from "react";

interface StatusChipInterface {
  status: string;
  short?: boolean;
}

const StatusChip: React.FC<StatusChipInterface> = ({status, short}) => {

  switch (status) {
    case 'waiting':
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
            {short ? 'Waiting for Approval' : 'Waiting for Approval from PM'}
          </Typography>
        </Box>
      )
      break;
    
    case 'waitingPr':
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
            {short ? 'Waiting for Approval' : 'Waiting for Approval from PR'}
          </Typography>
        </Box>
      )
      break;
  
    case 'approval':
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
            {short ? 'Approval' : 'Approval from PM'}
          </Typography>
        </Box>
      )
      break;
  
    case 'delivering':
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
            Delivering
          </Typography>
        </Box>
      )
      break;
  
    case 'delivered':
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
            Delivered
          </Typography>
        </Box>
      )
      break;
  
    default:
      break;
  }
}

export default StatusChip;
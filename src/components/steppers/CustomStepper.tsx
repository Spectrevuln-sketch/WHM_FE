import { Circle } from "@mui/icons-material";
import { Divider, Grid } from "@mui/material";
import React from "react";

import customStyle from './CustomStepper.module.css';

export interface CustomStepInterface{
  label: string;
  description: string;
}

export interface CustomStepperInterface {
  steps: CustomStepInterface[];
  activeStep: number;
}

const CustomStepper: React.FC<CustomStepperInterface> = ({steps, activeStep}) => {
  return(
    <Grid
      container
      direction={'row'}
      display={'flex'}
      overflow={'scroll'}
      alignItems={'center'}
      width={'100%'}
    >
      <Circle sx={{fontSize: '16px', color: '#27AE60'}} />
      {
        steps.filter((step, index) => index < activeStep).map((step, index) => (
          <Grid
            key={`step-${index}-container`}
            container
            direction={'row'}
            overflow={'scroll'}
            alignItems={'center'}
            width={'250px'}
          >
            <Divider className={customStyle.separatorActive} key={`step-${index}-divider`} sx={{flexGrow: 1, fontWeight: 400, fontSize: '12px', color: '#27AE60'}}>{step.description}</Divider>
            <Circle sx={{fontSize: '16px', color: '#27AE60'}} />
          </Grid>
        ))
      }
      {
        steps.filter((step, index) => index >= activeStep).map((step, index) => (
          <Grid
            key={`step-${index}-container`}
            container
            direction={'row'}
            overflow={'scroll'}
            alignItems={'center'}
            width={'250px'}
          >
            <Divider key={`step-${index}-divider`} sx={{flexGrow: 1, fontWeight: 400, fontSize: '12px', color: '#828282'}}>{step.description}</Divider>
            <Circle sx={{fontSize: '16px', color: '#EBEBEB'}} />
          </Grid>
        ))
      }
    </Grid>
  )
}

export default CustomStepper;
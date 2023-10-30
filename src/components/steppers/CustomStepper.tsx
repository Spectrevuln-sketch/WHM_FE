import { Circle } from "@mui/icons-material";
import { Divider, Fade, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";

import customStyle from './CustomStepper.module.css';

export interface CustomStepInterface{
  label: string;
  description: string;
  notes: string[];
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
          <Tooltip
            key={`tooltip-step-${index}-container`}
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            title={
              step.notes.length > 0
              ?
              <Grid
                container
                direction={'column'}
                gap={'5px'}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '20px',
                  }}
                >
                  Notes
                </Typography>
                {
                  step.notes.map((note, index) => (
                    <Typography
                    key={`note-tooltip-${index}`}
                      sx={{
                        fontWeight: 400,
                        fontSize: '11px',
                        lineHeight: '18px',
                      }}
                    >
                      {note}
                    </Typography>
                  ))
                }
              </Grid>
              : null
            }
          >
            <Grid
              key={`step-${index}-container`}
              container
              direction={'row'}
              overflow={'scroll'}
              alignItems={'center'}
              width={'200px'}
            >
              <Divider className={customStyle.separatorActive} key={`step-${index}-divider`} sx={{flexGrow: 1, fontWeight: 400, fontSize: '12px', color: '#27AE60'}}>{step.description}</Divider>
              <Circle sx={{fontSize: '16px', color: '#27AE60'}} />
            </Grid>
          </Tooltip>
        ))
      }
      {
        steps.filter((step, index) => index >= activeStep).map((step, index) => (
          <Tooltip
            key={`tooltip-step-${index}-container`}
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
            title={
              step.notes.length > 0
              ?
              <Grid
                container
                direction={'column'}
                gap={'5px'}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '20px',
                  }}
                >
                  Notes
                </Typography>
                {
                  step.notes.map((note, index) => (
                    <Typography
                    key={`note-tooltip-${index}`}
                      sx={{
                        fontWeight: 400,
                        fontSize: '11px',
                        lineHeight: '18px',
                      }}
                    >
                      {note}
                    </Typography>
                  ))
                }
              </Grid>
              : null
            }
          >
            <Grid
              key={`step-${index}-container`}
              container
              direction={'row'}
              overflow={'scroll'}
              alignItems={'center'}
              width={'200px'}
            >
              <Divider key={`step-${index}-divider`} sx={{flexGrow: 1, fontWeight: 400, fontSize: '12px', color: '#828282'}}>{step.description}</Divider>
              <Circle sx={{fontSize: '16px', color: '#EBEBEB'}} />
            </Grid>
          </Tooltip>
        ))
      }
    </Grid>
  )
}

export default CustomStepper;
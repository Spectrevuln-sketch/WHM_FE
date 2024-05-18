'use client'
import { Box, styled } from "@mui/material";

export const PEMasterCoa = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  gap:'2em'
});
export const BoxCompo = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '2em 1em',
  borderRadius: '0.5em',
  backgroundColor: 'white'
})
export const Col = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
})
export const ColEnd = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
})
export const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1em'
})
export const BoxTable = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '0.5em',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '2em 1em',
})
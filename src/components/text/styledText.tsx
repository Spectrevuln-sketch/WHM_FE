import { Typography, styled } from "@mui/material";

// custom typography component
export const TitleDashboardText = styled(Typography)(()=>({
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: '24px',
  color: '#000'
}));

export const ButtonText = styled(Typography)(()=>({
  fontSize: '15px',
  fontWeight: 500,
  lineHeight: '18px',
  color: '#fff'
}));
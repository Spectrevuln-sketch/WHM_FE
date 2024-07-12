'use client';
import React from 'react';
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomFileInput from "@/components/inputs/CustomFileInput";
import CustomSelect from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import AddMsrProductModal from "@/components/modals/AddMsrProductModal";
import EditMsrProductModal from "@/components/modals/EditMsrProductModal";
import CustomCreateMsrTable from "@/components/tables/CustomCreateMsrTable";
import { TitleDashboardText } from "@/components/text/styledText";
import { Box, Grid } from "@mui/material";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import CustomAlert from '@/components/alert';
import SelectSearchInputModal from '@/components/modals/SelectSearchInputModal';
import { convertToSelect } from '@/helpers/converterHelper';
import moment from 'moment';
import { red } from '@mui/material/colors';


const AddSoq: React.FC = () => {

  return (
    <Box sx={{
      display: 'flex',
      flex : 1,
      flexDirection: 'column',
      backgroundColor: red[400]
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px'
      }}>
        TEST
      </Box>
    </Box>
  )
}

export default AddSoq;
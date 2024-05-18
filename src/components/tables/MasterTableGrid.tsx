'use client'
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar, useGridApiRef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import { TInitialData } from '@/app/(dashboard)/(withNavbar)/(master)/@interface';
import { Box } from '@mui/material';

interface IProps {
  initialData: TInitialData | DemoTreeDataValue;
}

export default function MasterTableGrid({ initialData }:IProps) {
  const apiRef = useGridApiRef()
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 100,
  });
  useEffect(()=>{
    if (initialData.columns.length < 0){
      initialData = data;
    }
  },[])
  return (
    <Box sx={{
      width: '100%',
      overflowX: 'scroll'
    }} >
      <DataGrid
        {...initialData}
        sx={{
          overflowX: 'auto',
          width: '100%'
        }}
        disableColumnResize={false}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          ...initialData?.initialState,
          filter: {
            ...initialData?.initialState?.filter,
            // filterModel: {
            //   items: [
            //     {
            //       field: 'rating',
            //       operator: '>',
            //       value: '2.5',
            //     },
            //   ],
            // },
          },
        }}
      />
    </Box>
  );
}
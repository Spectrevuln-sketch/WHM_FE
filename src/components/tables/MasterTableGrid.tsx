'use client'
import React, { useEffect, useState } from 'react';
import { DEFAULT_GRID_AUTOSIZE_OPTIONS, DataGrid, GridColDef, GridToolbar, gridClasses, useGridApiRef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DemoTreeDataValue } from '@mui/x-data-grid-generator/services/tree-data-generator';
import { TInitialData } from '@/app/(dashboard)/(withNavbar)/(master)/@interface';
import { Box, Stack } from '@mui/material';
import { GridAutosizeOptions } from '@mui/x-data-grid';

interface IProps {
  initialData: TInitialData | DemoTreeDataValue;
}

export default function MasterTableGrid({ initialData }:IProps) {
  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 100,
  });
  useEffect(()=>{
    if (initialData.columns.length < 0){
      initialData = data;
    }
  },[])

  const autosizeOptions: GridAutosizeOptions = {
    includeOutliers: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeOutliers,
    includeHeaders: DEFAULT_GRID_AUTOSIZE_OPTIONS.includeHeaders,
    expand: DEFAULT_GRID_AUTOSIZE_OPTIONS.expand,
    outliersFactor: Number.isNaN(parseFloat(String(DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor)))
      ? 1
      : parseFloat(String(DEFAULT_GRID_AUTOSIZE_OPTIONS.outliersFactor)),
  };


  const CustomNoRows = () =>(
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Data Found
    </Stack>
  )
  return (
    <div style={{ height: 400, width: '100%'}}>

      <DataGrid
        {...initialData}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            overflowX: "scroll"
          },
          [`& .${gridClasses.cell}`]: {
            py: 0.5,
          },
        }}
        density="compact"
        scrollbarSize={20}
        disableColumnResize={false}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: CustomNoRows
        }}
        getRowHeight={() => 'auto'}
        autosizeOptions={autosizeOptions}
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
    </div>
  );
}
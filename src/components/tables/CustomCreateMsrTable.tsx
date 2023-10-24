import { SelectedMaterialServiceInterface } from "@/app/(dashboard)/material-service-request/create/page";
import { AddCircleOutline } from "@mui/icons-material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomTextButton from "../buttons/CustomTextButton";
import { CustomTableColumnInterface } from "./CustomTable";

interface CustomCreateMsrTableInterface {
  column: CustomTableColumnInterface[];
  datas: SelectedMaterialServiceInterface[];
  onClickAdd: () => void;
}

const CustomCreateMsrTable: React.FC<CustomCreateMsrTableInterface> = ({column, datas}) => {

  return(
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
      }}
    >

      {/* table */}
      <Table
        aria-label="custom pagination table"
        sx={{
          minWidth: 500,
        }}
      >
        <TableHead
          sx={{
            backgroundColor: '#F7C113',
          }}
        >
          <TableRow>
            {
              column.map((col, index) => (
                <TableCell
                  key={`column-header-${index}`}
                  align="center"
                  sx={{
                    borderBottom: 'none'
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '20px',
                      color: '#fff'
                    }}
                  >
                    {col.label}
                  </Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((data, index) => (
            <TableRow key={Object.values(data)[0]}>
              <TableCell
                key={`${data.name}-${index}`}
                component="th"
                scope="row"
                align="center"
                sx={{
                  borderBottom: 'none',
                }}
              >
                <Box
                  sx={{
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  {index+1}
                </Box>
              </TableCell>
              {
                Object.entries(data).map(([key, value]) => (
                  <TableCell
                  key={`${key}-${value}`}
                    component="th"
                    scope="row"
                    align="center"
                    sx={{
                      borderBottom: 'none',
                    }}
                  >
                    <Box
                      sx={{
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                      }}
                    >
                      {value}
                    </Box>
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* add button */}
      <Box sx={{margin: '12px'}}>
        <CustomTextButton
          label="Add New Data"
          icon={<AddCircleOutline/>}
          color="#F7C113"
          isDisabled={false}
          onClick={() => console.log('add new data clicked')}
        />
      </Box>

    </TableContainer>
  )
}

export default CustomCreateMsrTable;
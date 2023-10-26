import { MaterialServiceItemInterface } from "@/app/(dashboard)/material-service-request/[msrNo]/page";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { CustomTableColumnInterface } from "./CustomTable";

interface CustomDetailsMsrTableInterface {
  column: CustomTableColumnInterface[];
  datas: MaterialServiceItemInterface[];
}

const CustomDetailsMsrTable: React.FC<CustomDetailsMsrTableInterface> = ({column, datas}) => {

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
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
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
                      color: '#000'
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
          {datas.map((data) => (
            <TableRow key={Object.values(data)[0]}>
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

    </TableContainer>
  )
}

export default CustomDetailsMsrTable;
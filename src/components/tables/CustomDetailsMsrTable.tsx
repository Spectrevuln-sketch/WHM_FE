import { MaterialServiceItemInterface } from "@/app/(dashboard)/(withNavbar)/material-service-request/[msrNo]/page";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { CustomTableColumnInterface } from "./CustomTable";
import { convertToCapitalcase } from "@/helpers/converterHelper";

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
      {datas.length && (
        <Table
          aria-label="custom pagination table"
        >
          <TableHead
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
          >
            <TableRow>
              {
                Object.keys(datas[0]).filter((key)=> key !== 'isManual').map((col, index) => (
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
                      {convertToCapitalcase(col.replaceAll("_"," "))}
                    </Typography>
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>

              <>
              {Array.isArray(datas) && datas.length > 0 && datas?.filter((data) => !data?.isManual).map((data) => (

               <>
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

                </>
              ))}
            </>
          </TableBody>
        </Table>

      )}

    </TableContainer>
  )
}

export default CustomDetailsMsrTable;
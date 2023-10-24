import { MsrData } from "@/app/(dashboard)/material-service-request/page";
import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";

export interface CustomTableColumnInterface {
  id: string,
  label: string,
}

interface CustomTableInterface {
  column: CustomTableColumnInterface[];
  datas: MsrData[];
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    newPage: number,
  ) => void;
}

const CustomTable: React.FC<CustomTableInterface> = ({column, datas, page, rowsPerPage, onPageChange}) => {

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const handleChangePage = (
    event: ChangeEvent<unknown>,
    newPage: number,
  ) => {
    event.preventDefault();
    onPageChange(newPage);
  };

  return(
    <TableContainer component={Box}>

      {/* table */}
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {
              column.map((col, index) => (
                <TableCell
                  key={`column-header-${index}`}
                  align="left"
                  sx={{
                    borderBottom: 'none'
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '16px',
                      lineHeight: '20px',
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
          {(rowsPerPage > 0
            ? datas.slice((page)*rowsPerPage-rowsPerPage, (page)*rowsPerPage)
            : datas
          ).map((data) => (
            <TableRow key={Object.values(data)[0]}>
              {
                Object.entries(data).map(([key, value]) => (
                  <TableCell
                  key={`${key}-${value}`}
                    component="th"
                    scope="row"
                    align="left"
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
          {emptyRows > 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{
                  borderBottom: 'none'
                }}
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      <Box
        sx={{
          width: '100%',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Pagination
          count={Math.ceil(datas.length/rowsPerPage)}
          page={page}
          variant="outlined"
          shape="rounded"
          size="large"
          onChange={(event, page) => handleChangePage(event, page)}
          sx={{
            '& .MuiPaginationItem-root': {
              '&.Mui-selected': {
                background: 'white',
                color: '#F7C113',
                border: 'solid 1px #F7C113',
                fontWeight: 600,
              },
            },
            '& .MuiButtonBase-root': {
              '&.MuiPaginationItem-previousNext': {
                background: '#F7C113',
                color: 'white',
              },
            },
          }}
        />
      </Box>

    </TableContainer>
  )
}

export default CustomTable;
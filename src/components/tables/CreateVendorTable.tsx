import { AddCircleOutline, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomTextButton from "../buttons/CustomTextButton";
import { CustomTableColumnInterface } from "./CustomTable";

export interface CreateVendorProductInterface{
  name: string;
  qty: number;
  uom: string;
  price: number;
}

interface CreateVendorTableInterface {
  column: CustomTableColumnInterface[];
  datas: CreateVendorProductInterface[];
  onClickAdd: () => void;
  onClickEdit: (index: number) => void;
  onClickDelete: (index: number) => void;
}

const CreateVendorTable: React.FC<CreateVendorTableInterface> = ({column, datas, onClickDelete, onClickEdit, onClickAdd}) => {

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
              <TableCell
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
                  <Grid
                    container
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <IconButton onClick={() => onClickEdit(index)}>
                      <EditOutlined sx={{color: '#2F80ED'}} />
                    </IconButton>
                    <IconButton onClick={() => onClickDelete(index)}>
                      <DeleteOutlineOutlined sx={{color: '#EB5757'}} />
                    </IconButton>
                  </Grid>
                </Box>
              </TableCell>
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
          onClick={onClickAdd}
        />
      </Box>

    </TableContainer>
  )
}

export default CreateVendorTable;
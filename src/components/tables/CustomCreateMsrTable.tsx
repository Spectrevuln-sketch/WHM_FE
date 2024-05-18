import { AddCircleOutline, DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextButton from "../buttons/CustomTextButton";
import { CustomTableColumnInterface } from "./CustomTable";
import { useAppSelector } from "@/store/store";
import { SelectedMaterialServiceInterface } from "@/app/(dashboard)/(withNavbar)/material-service-request/@usecase/handle";

export interface IState {
  qty: number;
  uom: string;
  name: string;
  requested_by: string;
  purpose: string;
  coaCode: string;
  groupCode: string;
  productCode: string;
}
interface CustomCreateMsrTableInterface {
  column: CustomTableColumnInterface[];
  datas: SelectedMaterialServiceInterface[];
  onClickAdd: () => void;
  onClickEdit: (index: number) => void;
  onClickDelete: (index: number) => void;
}

const CustomCreateMsrTable: React.FC<CustomCreateMsrTableInterface> = ({column, datas, onClickDelete, onClickEdit, onClickAdd}) => {
  const {uoms, product, coaCodes, groupCodes} = useAppSelector((state) => state.msr.selected)
  const [item, setItem] = useState<SelectedMaterialServiceInterface[]>([])
  const ChangeViewTable = ()=>{

   const initialData =  datas.map((item: SelectedMaterialServiceInterface)=>{
    if (item.isManual) return {
      ...item,
      name: item.isManual ? item.name : product.filter(data=> data.id === item.name)[0].ItemName,
      uom: uoms.filter(data => data.id === item.uom)[0].name,
      coaCode: coaCodes.filter(data => data.id === item.coaCode)[0].coa_name,
      groupCode: groupCodes.filter(data => data.id === item.groupCode)[0].name
  }
  return {
    ...item,
    name: item.isManual ? item.name : product.filter(data=> data.id === item.name)[0].ItemName,
    uom: uoms.filter(data => data.id === item.uom)[0].name,
}
   })
    setItem(initialData)
  }
  useEffect(()=>{
    ChangeViewTable()
  },[datas])
  return(
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        display: 'flex',
        flex :1,
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
            backgroundColor: '#365486',
          }}
        >
          <TableRow>
            {
              column.map((col, index) => (
                <TableCell
                  key={`column-header-${index}`}
                  align="center"
                  sx={{
                    borderBottom: 'none',
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
          {item.map((data, index) => (
            <TableRow key={`row-${index}`}>
              {/* Index cell */}
              <TableCell
                key={`index-${index}`}
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
                  {index + 1}
                </Box>
              </TableCell>

              {/* Data cells */}
              {column.filter(head=> head.id !== 'action' && head.id !== 'no').map((col, colIndex) => {
                return(
                  <TableCell
                  key={`cell-${index}-${colIndex}`}
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
                    {data[col.id]}
                  </Box>
                </TableCell>
                )


              })}

              {/* Action cell */}
              <TableCell
                key={`actions-${index}`}
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
                      <EditOutlined sx={{ color: '#2F80ED' }} />
                    </IconButton>
                    <IconButton onClick={() => onClickDelete(index)}>
                      <DeleteOutlineOutlined sx={{ color: '#EB5757' }} />
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
          color="#365486"
          isDisabled={false}
          onClick={onClickAdd}
        />
      </Box>

    </TableContainer>
  )
}

export default CustomCreateMsrTable;
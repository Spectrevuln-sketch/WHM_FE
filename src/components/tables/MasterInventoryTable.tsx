import { thousandSeparator } from "@/helpers/numericHelper";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import CustomContainedButton from "../buttons/CustomContainedButton";
import CustomSearchField from "../inputs/CustomSearchField";

export interface MasterInventoryTableColumnInterface {
  id: string,
  label: string,
}

export interface MasterInventoryTableInterface{
  productName: string;
  price: number;
  uom: string;
  stock: number;
  supplier: string;
  purchaseDate: string;
}

const dummyColumn: MasterInventoryTableColumnInterface[] =[
  {
    id: 'productName',
    label: 'PRODUCT NAME',
  },
  {
    id: 'price',
    label: 'PRICE',
  },
  {
    id: 'uom',
    label: 'UOM',
  },
  {
    id: 'stock',
    label: 'STOCK',
  },
  {
    id: 'supplier',
    label: 'SUPPLIER INFORMATION',
  },
  {
    id: 'purchaseDate',
    label: 'PURCHASE DATE',
  },
  {
    id: 'action',
    label: '',
  },
]
const dummyDatas: MasterInventoryTableInterface[] =[
  {
    productName: 'Laptop Dell Inspiron 15',
    price: 10000,
    uom: 'unit',
    stock: 50000,
    supplier: 'PT ANUGERAH SAMUDERA MADANINDO',
    purchaseDate: '2023-10-15'
  },
]

const MasterInventoryTable: React.FC = () => {

  const [column, setColumn] = React.useState<MasterInventoryTableColumnInterface[]>([])
  const [datas, setDatas] = React.useState<MasterInventoryTableInterface[]>([])

  const [search, setSearch] = React.useState('')

  const [page, setPage] = React.useState(1)
  const [rowsPerPage, ] = React.useState(10)

  const onClickDelete = (index: number) => {
    console.log('delete', index)
  }
  const onClickEdit = (index: number) => {
    console.log('edit', index)
  }
  const onClickCreate = () => {
    console.log('create')
  }

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    event.preventDefault();
    setPage(newPage);
  };

  React.useEffect(() => {
    setColumn(dummyColumn);
    setDatas(dummyDatas);
  }, [])

  return(
    <Grid
      container
      direction={'column'}
      marginTop={'28px'}
    >
      <Grid
        container
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Box width={'75%'}>
          <CustomSearchField
            isDisabled={false}
            isError={false}
            value={search}
            placeholder="Search Inventory"
            textHelper=""
            onChange={(val) => setSearch(val)}
          />
        </Box>
        <Box width={'160px'}>
          <CustomContainedButton label="Create Inventory" isDisabled={false} onClick={onClickCreate} />
        </Box>
      </Grid>

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
          marginTop: '21px',
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
            {(rowsPerPage > 0
              ? datas.slice((page)*rowsPerPage-rowsPerPage, (page)*rowsPerPage)
              : datas
            ).map((data, index) => (
              <TableRow key={Object.values(data)[0]}>
                {
                  Object.entries(data).map(([key, value], index) => (
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
                        {
                          [1, 3].includes(index)
                          ? index === 1 ? `Rp. ${thousandSeparator(value)}` : thousandSeparator(value)
                          : value
                        }
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
      </TableContainer>

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
    </Grid>
  )
}

export default MasterInventoryTable;
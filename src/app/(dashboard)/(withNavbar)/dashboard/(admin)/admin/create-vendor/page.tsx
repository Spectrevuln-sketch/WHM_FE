'use client'

import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonGrey from "@/components/buttons/CustomContainedButtonGrey";
import CustomSelect from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import CreateVendorTable, { CreateVendorProductInterface } from "@/components/tables/CreateVendorTable";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { TitleDashboardText } from "@/components/text/styledText";
import { StoreOutlined } from "@mui/icons-material";
import { Box, DialogContentText, Grid } from "@mui/material";
import React from "react";

const dummyProductColumn: CustomTableColumnInterface[] = [
  {
    id: 'no',
    label: 'No',
  },
  {
    id: 'productName',
    label: 'Product Name',
  },
  {
    id: 'qty',
    label: 'QTY',
  },
  {
    id: 'uom',
    label: 'UOM',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'action',
    label: 'Action',
  },
];

const dummyProductData: CreateVendorProductInterface[] = [
  {
    name: 'EPSON Tinta Print',
    qty: 100,
    uom: 'PCS',
    price: 2000000
  }
]

const CreateVendor: React.FC = () => {

  const [productColumn, setProductColumn] = React.useState<CustomTableColumnInterface[]>([])
  const [productData, setProductData] = React.useState<CreateVendorProductInterface[]>([])

  React.useEffect(() => {
    setProductColumn(dummyProductColumn);
    setProductData(dummyProductData)
  }, [])

  return (
    <Grid
      container
      direction={'column'}
      gap={'20px'}
      sx={{}}
    >

      <TitleDashboardText>Create Vendor</TitleDashboardText>

      {/* form */}
      <Grid
        container
        direction={'row'}
        width={'70%'}
        marginTop={'82px'}
      >
        <Box
          sx={{
            display: 'flex',
            width: '50%',
            paddingRight: '18px',
            gap: '18px'
          }}
        >
          <StoreOutlined sx={{fontSize: '72px'}} />
          <CustomTextField
            isDisabled={false}
            isError={false}
            label="Vendor Name"
            placeholder="Enter your Vendor Name"
            textHelper=""
            endAdornment=""
            value={''}
            onChange={(val) => console.log(val)}
          />
        </Box>
        <Box sx={{width: '50%', paddingLeft: '18px'}}>
          <CustomTextField
            isDisabled={false}
            isError={false}
            label="Phone Number"
            placeholder="Enter your Phone Number"
            textHelper=""
            endAdornment=""
            value={''}
            onChange={(val) => console.log(val)}
          />
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        width={'70%'}
      >
        <Box sx={{width: '50%', paddingRight: '18px'}}>
          <CustomTextareaField
            isDisabled={false}
            isError={false}
            rows={3}
            label="Address"
            placeholder="Enter your Address"
            textHelper=""
            endAdornment=""
            value={''}
            onChange={(val) => console.log(val)}
          />
        </Box>
        <Box sx={{width: '50%', paddingLeft: '18px'}}>
          <CustomTextField
            isDisabled={false}
            isError={false}
            label="Email"
            placeholder="Enter your Email"
            textHelper=""
            endAdornment=""
            value={''}
            onChange={(val) => console.log(val)}
          />
        </Box>
      </Grid>
      
      <Grid
        container
        direction={'row'}
        width={'70%'}
      >
        <Box sx={{width: '50%', paddingRight: '18px'}}>
          <CustomSelect
            isDisabled={false}
            isError={false}
            label="Address"
            placeholder="Enter your Address"
            textHelper=""
            value={''}
            options={[]}
            onChange={(val) => console.log(val)}
          />
        </Box>
      </Grid>

      <DialogContentText sx={{marginTop: '18px'}}>Product</DialogContentText>

      <CreateVendorTable
        column={productColumn}
        datas={productData}
        onClickAdd={() => console.log('add')}
        onClickDelete={(index) => console.log('delete', index)}
        onClickEdit={(index) => console.log('edit', index)}
      />

      <Grid
        container
        direction={'row'}
        marginTop={'32px'}
        gap={'8px'}
      >
        <Box width={'200px'}>
          <CustomContainedButton isDisabled={false} label="Update Data" onClick={() => console.log('update data')} />
        </Box>
        <Box width={'200px'}>
          <CustomContainedButtonGrey isDisabled={false} label="Cancel" onClick={() => console.log('Cancel')} />
        </Box>
      </Grid>

    </Grid>
  )
}

export default CreateVendor;
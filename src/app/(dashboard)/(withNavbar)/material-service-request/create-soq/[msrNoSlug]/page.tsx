'use client';

import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonBlue from "@/components/buttons/CustomContainedButtonBlue";
import StatusChip from "@/components/chips/StatusChip";
import CustomSelect, { SelectOption } from "@/components/inputs/CustomSelect";
import CustomSelectVendor from "@/components/inputs/CustomSelectVendor";
import CustomTextField from "@/components/inputs/CustomTextField";
import { TitleDashboardText } from "@/components/text/styledText";
import { thousandSeparator } from "@/helpers/numericHelper";
import { FiberManualRecord, Store } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export interface PurchaseRequestItemInterface{
  msrNo: string;
  name: string;
  unitPrice: number;
  qty: number;
  uom: string;
  vendor: string;
}

const dummyMsrNoOptions: SelectOption[] = [
  {
    label: '0869-ASM-000-PR-IX-2023',
    value: '0869-ASM-000-PR-IX-2023'
  },
];

const dummySelectedProducts: PurchaseRequestItemInterface[] = [
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    name: 'EPSON INK BOTTLE 008 BLACK',
    qty: 3,
    unitPrice: 275000,
    uom: 'PCS',
    vendor: 'GABRIEL INTI MARINDO'
  },
  {
    msrNo: '0869-ASM-000-PR-IX-2023',
    name: 'EPSON INK BOTTLE 008 BLACK',
    qty: 3,
    unitPrice: 275000,
    uom: 'PCS',
    vendor: ''
  },
];

const CreateSoq = ({ params }: { params: { msrNoSlug: string } }) => {

  const [msrNoOptions, setMsrNoOptions] = React.useState<SelectOption[]>([])
  // const [products, setProducts] = React.useState<MaterialServiceItemInterface[]>([])
  const [selectedProducts, setSelectedProducts] = React.useState<PurchaseRequestItemInterface[]>([])

  const changeDataSelectedProducts = (key: string, value: number | string, index: number) => {
    const newState: PurchaseRequestItemInterface[] = [...selectedProducts];
    switch (key) {
      case 'msrNo':
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, msrNo: String(value)}
            : item
          )
        )
        break;

      case 'name':
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, name: String(value)}
            : item
          )
        )
        break;

      case 'qty':
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, qty: Number(value)}
            : item
          )
        )
        break;

      case 'unitPrice':
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, unitPrice: Number(value)}
            : item
          )
        )
        break;

      case 'uom':
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, uom: String(value)}
            : item
          )
        )
        break;

      case 'vendor':
        console.log(value)
        setSelectedProducts(
          newState.map((item, i) =>
            i === index
            ? {...item, vendor: String(value)}
            : item
          )
        )
        break;

      default:
        break;
    }
  };

  React.useEffect(() => {
    setMsrNoOptions(dummyMsrNoOptions);
    setSelectedProducts(dummySelectedProducts);
  }, [])

  // form validation
  const validator = ['', null, undefined, false, 0, '0'];
  const createPrValidation = () => {
    const con = selectedProducts.map((obj) => (
      Object.entries(obj).map((value) => (validator?.includes(value[1])))
    ));
    return con.flat();
  };
  const disableSubmit = React.useMemo(() => {
    console.log(createPrValidation())
    if (!createPrValidation().includes(true)) {
      return false;
    } else {
      return true;
    }
  }, [
    selectedProducts,
  ]);

  return (
    <Grid
      container
      direction={'column'}
      sx={{
        paddingTop: '50px',
        paddingLeft: '80px',
      }}
    >

      {/* logo */}
      {/* <Image src={mainImage.logoSmall} width={44} height={44} alt="company-logo" /> */}

      {/* title */}
      <Grid
        container
        direction={'row'}
        gap={'10px'}
        alignItems={'center'}
        marginTop={'16px'}
      >
        <TitleDashboardText>Creating Summary Of Quotation</TitleDashboardText>
        <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '32px',
            lineHeight: '24px',
            color: 'rgba(75, 70, 92, 1)'
          }}
        >{params.msrNoSlug}</Typography>
      </Grid>
      <Grid
        container
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Box sx={{width: '300px', marginTop: '24px'}}>
          <StatusChip color={0} label="Waiting for Creating Summary Of Quotation" />
        </Box>
        <Box
          sx={{
            width: '200px'
          }}
        >
          <CustomContainedButton
            isDisabled={false}
            label="Add New Product"
            onClick={() => console.log('add new product')}
          />
        </Box>
      </Grid>

      {/* form purchase request */}
      {
        selectedProducts.map((product, index) => (
          <Grid
            key={`purchase-request-${index}`}
            container
            direction={'column'}
            marginTop={'140px'}
          >

            <Grid
              container
              direction={'row'}
            >

              {/* form */}
              <Grid
                container
                direction={'column'}
                width={'40%'}
                gap={'32px'}
              >
                <Box>
                  <CustomSelect
                    label="Nomor MSR"
                    placeholder="Pilih Nomor MSR"
                    value={product.msrNo}
                    onChange={(val) => changeDataSelectedProducts('msrNo', val, index)}
                    options={msrNoOptions}
                    isDisabled={false}
                    isError={false}
                    textHelper=""
                  />
                </Box>
                <Box>
                  <CustomTextField
                    label="Product Name"
                    placeholder="Enter your Product Name"
                    value={product.name}
                    onChange={(val) => changeDataSelectedProducts('name', val, index)}
                    endAdornment=""
                    isDisabled={false}
                    isError={false}
                    textHelper=""
                  />
                </Box>
                <Box>
                  <CustomTextField
                    label="Quantity"
                    placeholder="Enter your Quantity"
                    value={product.qty.toString()}
                    onChange={(val) => changeDataSelectedProducts('qty', val, index)}
                    endAdornment=""
                    isDisabled={false}
                    isError={false}
                    textHelper=""
                  />
                </Box>
                <Box>
                  <CustomTextField
                    label="Unit of Measure"
                    placeholder="Enter your Unit of Measure"
                    value={product.uom}
                    onChange={(val) => changeDataSelectedProducts('uom', val, index)}
                    endAdornment=""
                    isDisabled={false}
                    isError={false}
                    textHelper=""
                  />
                </Box>
              </Grid>

              {/* price */}
              <Grid
                container
                direction={'column'}
                width={'40%'}
                justifyContent={'flex-start'}
                alignItems={'flex-start'}
                paddingLeft={'32px'}
              >

                <Grid
                  container
                  direction={'row'}
                  alignItems={'center'}
                  gap={'14px'}
                  marginTop={'40px'}
                >
                  <Box
                    sx={{
                      backgroundColor: '#F7C113',
                      paddingY: '4px',
                      paddingX: '8px'
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#fff'
                      }}
                    >
                      Recommendation Vendor
                    </Typography>
                  </Box>
                  <Typography>GABRIEL INTI MARINDO</Typography>
                </Grid>

                <Grid
                  container
                  direction={'row'}
                  marginTop={'30px'}
                  gap={'18px'}
                  alignItems={'center'}
                >
                  <Store sx={{
                    fontSize: '52px'
                  }} />
                  <Box
                    sx={{
                      width: '300px'
                    }}
                  >
                    <CustomSelectVendor
                      isError={false}
                      label="Recommendation Vendor"
                      placeholder="GABRIEL INTI MARINDO"
                      value={product.vendor}
                      onChange={(val) => changeDataSelectedProducts('vendor', val, index)}
                      options={[
                        {
                          label: product.vendor,
                          value: product.vendor
                        }
                      ]}
                      textHelper=""
                      product={product}
                    />
                  </Box>
                </Grid>

                <Grid
                  container
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={'32px'}
                >

                  {/* price key */}
                  <Grid
                    direction={'column'}
                    gap={'8px'}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '24px'
                      }}
                    >
                      Payment details
                    </Typography>
                    <Typography
                      sx={{
                        marginTop: '24px',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '24px'
                      }}
                    >
                      Total Orders 1 (Product)
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '24px'
                      }}
                    >
                      Total Price
                    </Typography>
                  </Grid>

                  {/* price value */}
                  <Grid
                    direction={'column'}
                    gap={'8px'}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#F7C113'
                      }}
                    >
                      Rp. {thousandSeparator(product.unitPrice)}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#F7C113'
                      }}
                    >
                      Rp. {thousandSeparator(product.unitPrice*product.qty)}
                    </Typography>
                  </Grid>

                </Grid>
              </Grid>

            </Grid>

          </Grid>
        ))
      }

      <Grid
        container
        direction={'row'}
        gap={'12px'}
        sx={{
          marginTop: '100px'
        }}
      >
        <Box
          sx={{
            width: '200px'
          }}
        >
          <CustomContainedButtonBlue
            isDisabled={disableSubmit}
            label={`Submit ${selectedProducts.length} Products`}
            onClick={() => console.log('submit')}
          />
        </Box>
      </Grid>

    </Grid>
  )
}

export default CreateSoq;
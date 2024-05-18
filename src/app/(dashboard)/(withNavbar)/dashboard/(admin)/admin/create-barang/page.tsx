'use client'

import { dashboardIcons } from "@/assets/icon/dashboard";
import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomContainedButtonGrey from "@/components/buttons/CustomContainedButtonGrey";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import CustomSelect, { SelectOption } from "@/components/inputs/CustomSelect";
import CustomSelectVendor from "@/components/inputs/CustomSelectVendor";
import CustomTextField from "@/components/inputs/CustomTextField";
import GenerateQrCodeModal from "@/components/modals/GenerateQrCodeModal";
import { TitleDashboardText } from "@/components/text/styledText";
import { thousandSeparator } from "@/helpers/numericHelper";
import { Store } from "@mui/icons-material";
import { Box, Grid, Radio, SelectChangeEvent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type FormBarang = {
  productName: string;
  price: number;
  qty: number;
  storageLoc: string
  uom: string;
  purchaseDate: string;
  deliverWith: string;
}

const dummyProductNameOptions: SelectOption[] = [
  {
    value: '1',
    label: 'Lem Korea'
  }
]

const CreateBarang: React.FC = () => {
  const [generateQrModalOpen, setGenerateQrModalOpen] = React.useState(false)
  const [deliverWith, setDeliverWith] = React.useState('')
  const [formBarang, setFormBarang] = React.useState<FormBarang>({
    productName: '',
    price: 0,
    qty: 0,
    storageLoc: '',
    uom: '',
    purchaseDate: '',
    deliverWith: '',
  })
  const [productNameOptions, setProductNameOptions] = React.useState<SelectOption[]>([])

  const handleChangeForm = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setFormBarang({
      ...formBarang,
      [e!.currentTarget.name]: e!.currentTarget.value
    })
  }

  const handleChangeSelectForm = (e: SelectChangeEvent<string> | undefined) => {
    setFormBarang({
      ...formBarang,
      [e!.target.name]: e!.target.value
    })
  }

  // form validation
  const validator = ['', null, undefined, false, 0, '0'];

  const submitConditionArray = [
    validator?.includes(formBarang.productName),
    validator?.includes(formBarang.price),
    validator?.includes(formBarang.qty),
    validator?.includes(formBarang.storageLoc),
    validator?.includes(formBarang.uom),
    validator?.includes(formBarang.purchaseDate),
    validator?.includes(formBarang.deliverWith),
  ]

  const disableSubmit = React.useMemo(() => {
    if (!submitConditionArray?.includes(true)) {
      return false;
    } else {
      return true;
    }
  }, [
    formBarang
  ]);

  React.useEffect(() => {
    setProductNameOptions(dummyProductNameOptions)
  }, [])
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >
      <GenerateQrCodeModal isOpen={generateQrModalOpen} qrCode="zamganteng" onClose={() => setGenerateQrModalOpen(false)} />

      <TitleDashboardText>Create Master Barang</TitleDashboardText>

      {/* form */}
      <Grid
        container
        direction={'row'}
        marginTop={'75px'}
      >

        {/* form left */}
        <Grid
          container
          direction={'column'}
          width={'55%'}
          gap={'32px'}
          paddingRight={'12px'}
        >

          <Grid
            container
            direction={'row'}
          >
            <Box sx={{width: '50%', paddingRight: '18px'}}>
              <CustomSelect
                isDisabled={false}
                isError={false}
                label="Product Name"
                name="productName"
                placeholder="Enter your Product Name"
                textHelper=""
                value={''}
                options={productNameOptions}
                onChange={(val, e) => handleChangeSelectForm(e)}
              />
            </Box>
            <Box sx={{width: '50%', paddingLeft: '18px'}}>
              <CustomTextField
                isDisabled={false}
                name="price"
                isError={false}
                label="Price"
                type="number"
                placeholder="Enter your Price"
                textHelper="Note: Select Supplier Information"
                endAdornment=""
                value={''}
                onChange={(val, e) => handleChangeForm(e)}
              />
            </Box>
          </Grid>

          <Grid
            container
            direction={'row'}
          >
            <Box sx={{width: '50%', paddingRight: '18px'}}>
              <CustomTextField
                isDisabled={false}
                isError={false}
                label="Quantity"
                placeholder="Enter your Quantity"
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
                label="Storage Location"
                placeholder="Enter your Storage Location"
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
          >
            <Box sx={{width: '50%', paddingRight: '18px'}}>
              <CustomSelect
                isDisabled={false}
                isError={false}
                label="Unit of Measure"
                placeholder="Enter your UOM"
                textHelper=""
                value={''}
                options={[]}
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box sx={{width: '50%', paddingLeft: '18px'}}>
              <CustomDatePicker
                isDisabled={false}
                isError={false}
                label="Purchase Date"
                placeholder="Enter your Purchase Date"
                textHelper=""
                value={''}
                onChange={(val) => console.log(val)}
              />
            </Box>
          </Grid>

        </Grid>

        {/* form right */}
        <Grid
          container
          direction={'column'}
          width={'45%'}
          gap={'28px'}
          paddingLeft={'12px'}
        >

          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '13px'
            }}
          >
            Supplier Information :
          </Typography>

          <Grid
            container
            direction={'column'}
            gap={'22px'}
          >
            <Grid
              container
              direction={'row'}
              gap={'16px'}
              justifyContent={'space-between'}
            >
              <Box
                height={'64px'}
                width={'64px'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  backgroundColor: '#FF9F4314',
                  padding: '10px',
                  borderRadius: '6px'
                }}
              >
                <Image src={mainImage.logoSmall} alt="logo-asm" width={44} height={44} />
              </Box>
              <Grid
                display={'flex'}
                direction={'column'}
                justifyContent={'center'}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: '15px',
                    color: '#4B465C'
                  }}
                >
                  PT ANUGERAH SAMUDERA MADANINDO
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '13px',
                    color: '#4B465C'
                  }}
                >
                  Delivering with ASM
                </Typography>
              </Grid>
              <Box
                display={'flex'}
                flexGrow={1}
                justifyContent={'flex-end'}
              >
                <Radio
                  checked={deliverWith == 'asm'}
                  value={'asm'}
                  sx={{ flexDirection: 'row-reverse' }}
                  onClick={() => setDeliverWith('asm')}
                />
              </Box>
            </Grid>
            {
              deliverWith !== 'vendor'
              ?
              <Grid
                container
                direction={'row'}
                gap={'16px'}
              >
                <Box
                  height={'64px'}
                  width={'64px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  sx={{
                    backgroundColor: '#7367F014',
                    padding: '10px',
                    borderRadius: '6px'
                  }}
                >
                  <Image src={dashboardIcons.vendorIcon} alt="vendor-icon" width={24} height={24} />
                </Box>
                <Grid
                  display={'flex'}
                  direction={'column'}
                  justifyContent={'center'}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '15px',
                      color: '#4B465C'
                    }}
                  >
                    Vendor
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '13px',
                      color: '#4B465C'
                    }}
                  >
                    Delivering with Vendor
                  </Typography>
                </Grid>
                <Box
                  display={'flex'}
                  flexGrow={1}
                  justifyContent={'flex-end'}
                >
                  <Radio
                    checked={deliverWith == 'vendor'}
                    value={'vendor'}
                    sx={{ flexDirection: 'row-reverse' }}
                    onClick={() => setDeliverWith('vendor')}
                  />
                </Box>
              </Grid>
              : null
            }
            {
              deliverWith === 'vendor'
              ?
              <>
                <Grid
                  container
                  direction={'row'}
                  alignItems={'center'}
                  gap={'14px'}
                  marginTop={'0px'}
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
                  marginTop={'4px'}
                  gap={'18px'}
                  alignItems={'center'}
                >
                  <Store sx={{

                    fontSize: '52px'
                  }} />
                  <Box
                    flexGrow={1}
                  >
                    <CustomSelectVendor
                      isError={false}
                      label="Recommendation Vendor"
                      placeholder="GABRIEL INTI MARINDO"
                      value={''}
                      onChange={(val) => console.log(val)}
                      options={[]}
                      textHelper=""
                      product={{msrNo: '', name: '', qty: 0, unitPrice: 0, uom: '', vendor: ''}}
                    />
                  </Box>
                </Grid>

                <Grid
                  container
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={'4px'}
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
                        marginTop: '4px',
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
                      Rp. {thousandSeparator(275000)}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#F7C113'
                      }}
                    >
                      Rp. {thousandSeparator(825000)}
                    </Typography>
                  </Grid>

                </Grid>
              </>
              : null
            }
          </Grid>

        </Grid>

      </Grid>

      <Grid
        container
        direction={'row'}
        display={'flex'}
        gap={'8px'}
        marginTop={'38px'}
      >
        <Box
          sx={{
            width: '203px'
          }}
        >
          <CustomContainedButton
            label="Create Master Barang"
            isDisabled={disableSubmit}
            onClick={() => console.log('create')}
          />
        </Box>
        <Box
          sx={{
            width: '196px'
          }}
        >
          <CustomContainedButtonGrey
            isDisabled={false}
            label="Cancel"
            onClick={() => console.log('cancel')}
          />
        </Box>
      </Grid>

    </Grid>
  )
}

export default CreateBarang;
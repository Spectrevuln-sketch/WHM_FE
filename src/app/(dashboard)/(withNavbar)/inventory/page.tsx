'use client'

import { dashboardIcons } from "@/assets/icon/dashboard";
import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import CustomSelect from "@/components/inputs/CustomSelect";
import CustomSelectVendor from "@/components/inputs/CustomSelectVendor";
import CustomTextField from "@/components/inputs/CustomTextField";
import GenerateQrCodeModal from "@/components/modals/GenerateQrCodeModal";
import { TitleDashboardText } from "@/components/text/styledText";
import { thousandSeparator } from "@/helpers/numericHelper";
import { Store } from "@mui/icons-material";
import { Box, Grid, Radio, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Inventory: React.FC = () => {
  const [generateQrModalOpen, setGenerateQrModalOpen] = React.useState(false)

  const [deliverWith, setDeliverWith] = React.useState('')
  return (
    <Grid
      container
      direction={'column'}
      sx={{}}
    >
      <GenerateQrCodeModal isOpen={generateQrModalOpen} qrCode="zamganteng" onClose={() => setGenerateQrModalOpen(false)} />

      <TitleDashboardText>Inventory</TitleDashboardText>

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
            gap={'36px'}
          >
            <Box flexGrow={1}>
              <CustomSelect
                isDisabled={false}
                isError={false}
                label="Product Name"
                placeholder="Enter your Product Name"
                textHelper=""
                value={''}
                options={[]}
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box flexGrow={1}>
              <CustomSelect
                isDisabled={false}
                isError={false}
                label="Budget Code"
                placeholder="Enter your Budget Code"
                textHelper=""
                value={''}
                options={[]}
                onChange={(val) => console.log(val)}
              />
            </Box>
          </Grid>

          <Grid
            container
            direction={'row'}
            gap={'36px'}
          >
            <Box flexGrow={1}>
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
            <Box flexGrow={1}>
              <CustomTextField
                isDisabled={false}
                isError={false}
                label="Vessel / Site / Dept"
                placeholder="Enter your Vessel / Site / Dept"
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
            gap={'36px'}
          >
            <Box flexGrow={1}>
              <CustomTextField
                isDisabled={false}
                isError={false}
                label="Description"
                placeholder="Enter your Description"
                textHelper=""
                endAdornment=""
                value={''}
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box flexGrow={1}>
              <CustomDatePicker
                isDisabled={false}
                isError={false}
                label="Delivery Date"
                placeholder="Enter your Delivery Date"
                textHelper=""
                value={''}
                onChange={(val) => console.log(val)}
              />
            </Box>
          </Grid>

          <Grid
            container
            direction={'row'}
            gap={'36px'}
            justifyContent={'space-between'}
          >
            <Box flexGrow={1}>
              <CustomSelect
                isDisabled={false}
                isError={false}
                label="Product Name"
                placeholder="Enter your Product Name"
                textHelper=""
                value={''}
                options={[]}
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box flexGrow={1}>
              <CustomTextField
                isDisabled={false}
                isError={false}
                label="Suggest Supplier"
                endAdornment=""
                placeholder="Enter your Suggest Supplier"
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
            Delivering With :
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
                <Image src={mainImage.logoSmallYellow} alt="logo-asm" width={44} height={44} />
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

      <Box
        sx={{
          marginTop: '38px',
          width: '340px'
        }}
      >
        <CustomContainedButton
          label="Generated QR Code"
          isDisabled={false}
          onClick={() => setGenerateQrModalOpen(true)}
        />
      </Box>

    </Grid>
  )
}

export default Inventory;
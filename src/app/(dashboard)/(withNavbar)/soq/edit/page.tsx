import CustomContainedButtonBlue from '@/components/buttons/CustomContainedButtonBlue'
import CustomSelectVendor from '@/components/inputs/CustomSelectVendor'
import { TitleDashboardText } from '@/components/text/styledText'
import { thousandSeparator } from '@/helpers/numericHelper'
import { FiberManualRecord } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'

const EditSoq = () => {
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

export default EditSoq
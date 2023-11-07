import { PurchaseRequestItemInterface } from "@/app/(dashboard)/(withNavbar)/material-service-request/create-pr/[msrNoSlug]/page";
import { thousandSeparator } from "@/helpers/numericHelper";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import CustomSearchField from "../inputs/CustomSearchField";

import customStyle from './SelectVendorModal.module.css';

interface RecommendationVendorInterface {
  name: string;
  price: number;
}

interface SelectVendorInterface {
  isOpen: boolean;
  product: PurchaseRequestItemInterface;
  onChange: (val: string) => void;
  onClose: () => void;
}

const dummyVendorOptions: RecommendationVendorInterface[] = [
  {
    name: 'GABRIEL INTI MARINDO',
    price: 275000
  },
  {
    name: 'CAHAYA MULTI SENTOSA',
    price: 325000
  },
  {
    name: 'ASTON SISTEM INDONESIA',
    price: 288288
  },
]

const SelectVendorModal: React.FC<SelectVendorInterface> = ({isOpen, product, onChange, onClose}) => {

  const [search, setSearch] = React.useState('')
  const [vendorOptions, setVendorOptions] = React.useState<RecommendationVendorInterface[]>([])

  const handleChangeSearch = (val: string) => {
    setSearch(val);
  }

  const handleSelectVendor = (val: string) => {
    onChange(val);
    onClose();
  }

  React.useEffect(() => {
    setVendorOptions(dummyVendorOptions);
  }, [])
  return(
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Grid
        component={Paper}
        container
        direction={'column'}
        width={'800px'}
        padding={'30px'}
      >

        {/* title & product */}
        <Grid
          container
          direction={'row'}
          gap={'8px'}
          alignItems={'center'}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px'
            }}
          >Recommendation Vendor</Typography>
          <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '24px'
            }}
          >{product.name}</Typography>
          <FiberManualRecord sx={{fontSize: '5px', color: 'rgba(0, 0, 0, 0.56)'}} />
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '24px'
            }}
          >{`${product.qty} ${product.uom}`}</Typography>
        </Grid>

        {/* search bar */}
        <Box sx={{marginTop: '42px'}}>
          <CustomSearchField
            isDisabled={false}
            isError={false}
            value={search}
            placeholder="Search Recommendation Vendor"
            textHelper=""
            onChange={(val) => handleChangeSearch(val)}
          />
        </Box>

        {/* vendor options */}
        <Grid
          container
          gap={'10px'}
          marginTop={'48px'}
          maxHeight={'250px'}
          sx={{
            overflow: '-moz-scrollbars-vertical', 
            overflowY: 'scroll',
          }}
        >
        {
          vendorOptions.filter((value) => value.name.toLowerCase().includes(search.toLowerCase()) ).map((vendor, index) => (
            
              <Grid
              key={`vendor-option-${index}`}
              className={customStyle.vendorOptions}
              container
              direction={'row'}
              gap={'42px'}
              paddingX={'10px'}
              paddingY={'18px'}
              onClick={() => handleSelectVendor(vendor.name)}
              >
                {/* vendor name */}
                <Grid
                  direction={'column'}
                  gap={'4px'}
                  flexGrow={1}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#4B465C'
                    }}
                  >
                    Recommendation Vendor
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#000'
                    }}
                  >
                    {vendor.name}
                  </Typography>
                </Grid>

                {/* price */}
                <Grid
                  direction={'column'}
                  gap={'4px'}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#4B465C'
                    }}
                  >
                    Unit Price
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#000'
                    }}
                  >
                    {`Rp. ${thousandSeparator(vendor.price)}`}
                  </Typography>
                </Grid>

                {/* total */}
                <Grid
                  direction={'column'}
                  gap={'4px'}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#4B465C'
                    }}
                  >
                    Total Price
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '15px',
                      color: '#000'
                    }}
                  >
                    {`Rp. ${thousandSeparator(vendor.price*product.qty)}`}
                  </Typography>
                </Grid>

              </Grid>
          ))
        }
        </Grid>
        
      </Grid>
    </Modal>
  )
}

export default SelectVendorModal;
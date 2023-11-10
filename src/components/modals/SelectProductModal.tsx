import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import CustomSearchField from "../inputs/CustomSearchField";

import { ProductInterface } from "./AddMsrProductModal";
import customStyle from './SelectProductModal.module.css';

interface SelectProductInterface {
  isOpen: boolean;
  options: ProductInterface[];
  onChange: (val: string) => void;
  onClose: () => void;
}

const SelectProductModal: React.FC<SelectProductInterface> = ({isOpen, options, onChange, onClose}) => {

  const [search, setSearch] = React.useState('')

  const handleChangeSearch = (val: string) => {
    setSearch(val);
  }

  const handleSelectProduct = (val: string) => {
    onChange(val);
    onClose();
  }

  React.useEffect(() => {
    //
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
        width={'600px'}
        padding={'24px'}
        gap={'16px'}
      >

        {/* search bar */}
        <Box>
          <CustomSearchField
            isDisabled={false}
            isError={false}
            value={search}
            placeholder="Search Product Name"
            textHelper=""
            onChange={(val) => handleChangeSearch(val)}
          />
        </Box>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '14px',
            color: '#73808C'
          }}
        >
          Choose Product Name
        </Typography>

        {/* product options */}
        <Grid
          container
          gap={'10px'}
          maxHeight={'250px'}
          sx={{
            overflow: '-moz-scrollbars-vertical', 
            overflowY: 'scroll',
          }}
        >
        {
          options.filter((value) => value.name.toLowerCase().includes(search.toLowerCase()) ).map((product, index) => (
            
              <Grid
              key={`product-option-${index}`}
              className={customStyle.productOptions}
              container
              direction={'row'}
              justifyContent={'space-between'}
              onClick={() => handleSelectProduct(product.id)}
              paddingX={'3px'}
              paddingY={'6px'}
              borderRadius={'6px'}
              >
                {/* product name */}
                <Grid
                  direction={'column'}
                  gap={'4px'}
                  flexGrow={1}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#000'
                    }}
                  >
                    {product.name}
                  </Typography>
                </Grid>

                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#73808C'
                  }}
                >
                  Select Product Name
                </Typography>

              </Grid>
          ))
        }
        </Grid>
        
      </Grid>
    </Modal>
  )
}

export default SelectProductModal;
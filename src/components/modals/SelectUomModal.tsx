import { Box, Grid, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import CustomSearchField from "../inputs/CustomSearchField";

import { UomInterface } from "./AddMsrProductModal";
import customStyle from './SelectUomModal.module.css';

interface SelectUomInterface {
  isOpen: boolean;
  options: UomInterface[];
  onChange: (val: string) => void;
  onClose: () => void;
}

const SelectUomModal: React.FC<SelectUomInterface> = ({isOpen, options, onChange, onClose}) => {

  const [search, setSearch] = React.useState('')

  const handleChangeSearch = (val: string) => {
    setSearch(val);
  }

  const handleSelectUom = (val: string) => {
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
            placeholder="Search Unit of Measure"
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
          Choose Unit of Measure
        </Typography>

        {/* uom options */}
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
          options.filter((value) => value.name.toLowerCase().includes(search.toLowerCase()) ).map((uom, index) => (
            
              <Grid
              key={`uom-option-${index}`}
              className={customStyle.uomOptions}
              container
              direction={'row'}
              justifyContent={'space-between'}
              onClick={() => handleSelectUom(uom.id)}
              paddingX={'3px'}
              paddingY={'6px'}
              borderRadius={'6px'}
              >
                {/* uom name */}
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
                    {uom.name}
                  </Typography>
                </Grid>

                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#73808C'
                  }}
                >
                  Select Unit of Measure
                </Typography>

              </Grid>
          ))
        }
        </Grid>
        
      </Grid>
    </Modal>
  )
}

export default SelectUomModal;
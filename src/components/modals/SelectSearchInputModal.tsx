import { Box, Grid, Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import CustomSearchField from '../inputs/CustomSearchField'
import customStyle from './SelectProductModal.module.css';
import moment from 'moment';

interface IProps {
  isOpen: boolean;
  options: any[];
  filterBy: string;
  subtext?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  onClose: () => void;
  label?: string;
}


const SelectSearchInputModal : React.FC<IProps> = ({
  isOpen = false,
  filterBy,
  options = [],
  subtext= '',
  placeholder = '',
  label = '',
  onChange,
  onClose
}): React.ReactElement => {

  const [search, setSearch] = React.useState('')

  const handleChangeSearch = (val: string) => {
    setSearch(val);
  }

  const handleSelectProduct = (val: string) => {
    onChange(val);
    onClose();
  }
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none'
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
            placeholder={placeholder}
            textHelper=""
            onChange={(val) => handleChangeSearch(val)}
          />
        </Box>

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
        {options.length > 0 || options === undefined ? (
          <>
          {options.filter((value) => value[filterBy].toLowerCase().includes(search.toLowerCase()) || value[subtext].includes(search) ).sort((a, b)=> a[filterBy].toLowerCase().localeCompare(b[filterBy].toLowerCase())).map((val, index) => (

              <Grid
              key={`product-option-${index}`}
              className={customStyle.productOptions}
              container
              direction={'row'}
              justifyContent={'space-between'}
              onClick={() => handleSelectProduct(val.id)}
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
                    {val[filterBy]}
                  </Typography>
                </Grid>

                <Typography
                  sx={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#73808C'
                  }}
                >
                  {label ?  label + ' ' + val[subtext] : val[subtext]}
                </Typography>

              </Grid>
          ))}
          </>
        ):(
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography alignItems={'center'}>
              No Data Found
            </Typography>
          </Box>
        )}
        </Grid>

      </Grid>
    </Modal>
  )
}

export default SelectSearchInputModal
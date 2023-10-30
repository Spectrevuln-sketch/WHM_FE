import { SelectedMaterialServiceInterface } from "@/app/(dashboard)/material-service-request/create/page";
import { Box, Grid, Modal, Paper } from "@mui/material";
import React from "react";
import CustomContainedButton from "../buttons/CustomContainedButton";
import CustomContainedButtonGrey from "../buttons/CustomContainedButtonGrey";
import CustomTextField from "../inputs/CustomTextField";

interface EditProductInterface {
  isOpen: boolean;
  productIndex: number;
  product: SelectedMaterialServiceInterface;
  onSubmit: (val: SelectedMaterialServiceInterface, index: number) => void;
  onClose: () => void;
}


const EditMsrProductModal: React.FC<EditProductInterface> = ({isOpen, productIndex, product, onSubmit, onClose}) => {

  const [qty, setQty] = React.useState<number>(0);
  const [uom, setUom] = React.useState<string>('');
  const [name, setName] = React.useState<string>('');
  const [reqBy, setReqBy] = React.useState<string>('');
  const [purpose, setPurpose] = React.useState<string>('');

  const handleSubmit = () => {

    // submit add product
    onSubmit(
      {
        qty,
        uom,
        name,
        reqBy,
        purpose,
      }, productIndex
    )

    // set default state
    setQty(0)
    setUom('')
    setName('')
    setReqBy('')
    setPurpose('')

    // close modal
    onClose()

  }

  React.useEffect(() => {
    setQty(product.qty);
    setName(product.name);
    setPurpose(product.purpose);
    setReqBy(product.reqBy);
    setUom(product.uom)
  }, [product])

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
        padding={'50px'}
        gap={'16px'}
      >

        <Grid
          container
          direction={'row'}
          width={'100%'}
          justifyContent={'space-between'}
        >
          <Box
            sx={{
              width: '50%',
              paddingRight: '13px',
            }}
          >
            <CustomTextField
              label="Quantity"
              placeholder="Quantity"
              endAdornment=""
              isDisabled={false}
              isError={false}
              textHelper=""
              value={String(qty)}
              onChange={(val) => setQty(Number(val))}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              paddingLeft: '13px',
            }}
          >
            <CustomTextField
              label="Unit of Measure"
              placeholder="Unit of Measure"
              endAdornment=""
              isDisabled={false}
              isError={false}
              textHelper=""
              value={uom}
              onChange={(val) => setUom(val)}
            />
          </Box>
        </Grid>

        <CustomTextField
          label="Product Name"
          placeholder="Product Name"
          endAdornment=""
          isDisabled={false}
          isError={false}
          textHelper=""
          value={name}
          onChange={(val) => setName(val)}
        />
        <CustomTextField
          label="Requested By"
          placeholder="Requested By"
          endAdornment=""
          isDisabled={false}
          isError={false}
          textHelper=""
          value={reqBy}
          onChange={(val) => setReqBy(val)}
        />
        <CustomTextField
          label="Purpose"
          placeholder="Purpose"
          endAdornment=""
          isDisabled={false}
          isError={false}
          textHelper=""
          value={purpose}
          onChange={(val) => setPurpose(val)}
        />

        <Grid
          container
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'16px'}
        >
          <Box
            sx={{
              width: '100px'
            }}
          >
            <CustomContainedButton
              isDisabled={false}
              label="Submit"
              onClick={handleSubmit}
            />
          </Box>
          <Box
            sx={{
              width: '100px'
            }}
          >
            <CustomContainedButtonGrey
              isDisabled={false}
              label="Cancel"
              onClick={onClose}
            />
          </Box>
        </Grid>

      </Grid>
    </Modal>
  )
}

export default EditMsrProductModal;
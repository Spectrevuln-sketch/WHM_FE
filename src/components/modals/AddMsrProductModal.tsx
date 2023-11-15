import { SelectedMaterialServiceInterface } from "@/app/(dashboard)/(withNavbar)/material-service-request/create/page";
import { convertProductToSelect, convertUomToSelect } from "@/helpers/converterHelper";
import { Box, Grid, Modal, Paper } from "@mui/material";
import React from "react";
import CustomContainedButton from "../buttons/CustomContainedButton";
import CustomContainedButtonGrey from "../buttons/CustomContainedButtonGrey";
import CustomSelect from "../inputs/CustomSelect";
import CustomTextField from "../inputs/CustomTextField";
import SelectProductModal from "./SelectProductModal";
import SelectUomModal from "./SelectUomModal";


export interface ProductInterface {
  id: string;
  name: string;
}
export interface UomInterface {
  id: string;
  name: string;
}

const dummyProductOptions: ProductInterface[] = [
  {
    id: '1',
    name: 'Fresh Water YASHIMA',
  },
  {
    id: '2',
    name: 'Fresh Water BIANCA-8',
  },
  {
    id: '3',
    name: 'RAM SODIMM 8GB DDR4 3200MHZ',
  },
  {
    id: '4',
    name: 'HARDISK EXTERNAL 1TB WD',
  },
]
const dummyUomOptions: UomInterface[] = [
  {
    id: '1',
    name: 'PCS',
  },
  {
    id: '2',
    name: 'KG',
  },
  {
    id: '3',
    name: 'L',
  },
]
interface AddProductModalInterface {
  isOpen: boolean;
  onSubmit: (val: SelectedMaterialServiceInterface) => void;
  onClose: () => void;
}


const AddMsrProductModal: React.FC<AddProductModalInterface> = ({isOpen, onSubmit, onClose}) => {

  const [qty, setQty] = React.useState<number>(0);
  const [uom, setUom] = React.useState<string>('');
  const [uomOptions, setUomOptions] = React.useState<UomInterface[]>([]);
  const [name, setName] = React.useState<string>('');
  const [nameOptions, setNameOptions] = React.useState<ProductInterface[]>([]);
  const [reqBy, setReqBy] = React.useState<string>('this_user');
  const [purpose, setPurpose] = React.useState<string>('');

  const [selectProductOpen, setSelectProductOpen] = React.useState(false);
  const [selectUomOpen, setSelectUomOpen] = React.useState(false);

  const handleOpenSelectProduct = () => {
    setSelectProductOpen(true)
  }
  const handleCloseSelectProduct = () => {
    setSelectProductOpen(false)
  }
  const handleOpenSelectUom = () => {
    setSelectUomOpen(true)
  }
  const handleCloseSelectUom = () => {
    setSelectUomOpen(false)
  }
  const handleSubmit = () => {

    // submit add product
    onSubmit(
      {
        qty,
        uom,
        name,
        reqBy,
        purpose,
      }
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

  // form validation
  const validator = ['', null, undefined, false, 0, '0'];
  
  const submitConditionArray = [
    validator?.includes(qty),
    validator?.includes(uom),
    validator?.includes(name),
    validator?.includes(reqBy),
    validator?.includes(purpose),
  ]

  const disableSubmit = React.useMemo(() => {
    if (!submitConditionArray?.includes(true)) {
      return false;
    } else {
      return true;
    }
  }, [
    qty,
    uom,
    name,
    reqBy,
    purpose,
  ]);

  React.useEffect(() => {
    setNameOptions(dummyProductOptions)
    setUomOptions(dummyUomOptions)
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
        padding={'50px'}
        gap={'16px'}
      >

        <SelectProductModal
          isOpen={selectProductOpen}
          options={nameOptions}
          onClose={handleCloseSelectProduct}
          onChange={(val) => setName(val)}
        />
        <SelectUomModal
          isOpen={selectUomOpen}
          options={uomOptions}
          onClose={handleCloseSelectUom}
          onChange={(val) => setUom(val)}
        />
        
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
              type="number"
              onChange={(val) => setQty(Number(val))}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              paddingLeft: '13px',
            }}
          >
            <Box onClick={handleOpenSelectUom}>
              <CustomSelect
                label="Unit of Measure"
                placeholder="Unit of Measure"
                isDisabled={true}
                isError={false}
                textHelper=""
                value={uom}
                options={convertUomToSelect(uomOptions)}
                onChange={(val) => console.log(val)}
              />
            </Box>
          </Box>
        </Grid>
        <Box onClick={handleOpenSelectProduct}>
          <CustomSelect
            label="Product Name"
            placeholder="Product Name"
            isDisabled={true}
            isError={false}
            textHelper=""
            value={name}
            options={convertProductToSelect(nameOptions)}
            onChange={(val) => console.log(val)}
          />
        </Box>
        <CustomTextField
          label="Requested By"
          placeholder="Requested By"
          endAdornment=""
          isDisabled={true}
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
              isDisabled={disableSubmit}
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

export default AddMsrProductModal;
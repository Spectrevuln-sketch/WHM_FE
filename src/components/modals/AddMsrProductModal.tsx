import { SelectedMaterialServiceInterface } from "@/app/(dashboard)/(withNavbar)/material-service-request/create/page";
import { convertCoaCodeToSelect, convertProductToSelect, convertToSelect, convertUomToSelect } from "@/helpers/converterHelper";
import { Box, Grid, Modal, Paper } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import CustomContainedButton from "../buttons/CustomContainedButton";
import CustomContainedButtonGrey from "../buttons/CustomContainedButtonGrey";
import CustomSelect from "../inputs/CustomSelect";
import CustomTextField from "../inputs/CustomTextField";
import SelectProductModal from "./SelectProductModal";
import SelectUomModal from "./SelectUomModal";
import { disableSubmit } from "@/helpers/validationForm";
import { getCurrentUser } from "@/helpers/tokenChecker";
import SelectSearchInputModal from "./SelectSearchInputModal";
import CustomCheckbox from "../inputs/CustomCheckbox";


export interface ProductInterface {
  BRAND: string;
  BRANDCODE: string;
  GROUPCODE: string;
  GROUPITEM: string;
  ITEM: string;
  ITEMCODE: string;
  ItemName?: string;
  ProductCode: string;
  PurchasePrice: string;
  QTY: number;
  SPECS: string;
  SPECSCODE: string;
  UOM: string;
  YearOfLastPurchase: string;
  coa: {
      id: string;
      created_at: string;
      updated_at: string;
      coa_name: string;
      coa_code: string;
  };
  coa_id: string;
  created_at: string;
  id: string;
  updated_at: string;
}
export interface UomInterface {
  id: string;
  name: string;
}

interface AddProductModalInterface {
  selectedProducts?: any;
  productIndex?:any;
  uomOption: any;
  productOption: any;
  coaOption: any;
  groupOption: any;
  isOpen: boolean;
  onSubmit: (val: SelectedMaterialServiceInterface) => void;
  onClose: () => void;
}

interface IPayload {
  isManual: boolean;
  qty : number | string;
  uom : string;
  name: string;
  requested_by: string;
  purpose: string;
  coaCode?: string;
  groupCode?: string;
}
type IModalSelect = {
  uomModal: boolean,
  productModal: boolean,
  coaCodeModal: boolean,
  groupCodeModal: boolean
}

const AddMsrProductModal: React.FC<AddProductModalInterface> = ({selectedProducts, productIndex, groupOption,coaOption, uomOption, productOption, isOpen, onSubmit, onClose}) => {
  const initialize : IPayload ={
    isManual: false,
    qty: 0,
    uom: '',
    name: '',
    requested_by: '',
    purpose: '',
    coaCode: '',
    groupCode: '',
  }
  const [payload, setPayload] = useState<IPayload>(initialize)
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
  const [modalOpen, setModalOpen] = useState<IModalSelect>({
    uomModal: false,
    productModal: false,
    coaCodeModal: false,
    groupCodeModal: false,
  })
  const handleSubmit = () => {
    onSubmit(payload)
    setPayload(initialize)
    onClose()
  }
  useEffect(()=>{

  },[])
  useEffect(() => {
    // Update the disableButtonForm state whenever payload changes
    setDisabledBtn(disableSubmit(payload));
  }, [payload]);
  useEffect(()=> {
    if(selectedProducts[productIndex] !== undefined){
      setPayload({
        ...initialize,
        ...selectedProducts[productIndex],

      })
    }else{


      getCurrentUser().then((res)=>{
        setPayload({
          ...initialize,
          requested_by:res.data.data.username,
        })
      })
    }
    },[isOpen])
  console.log('payload data >>', payload)
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
        <SelectSearchInputModal
          isOpen={modalOpen.groupCodeModal}
          filterBy="group_name"
          placeholder="Search Group Code"
          subtext="group_code"
          options={groupOption}
          onClose={()=> setModalOpen({
            ...modalOpen,
            groupCodeModal:!modalOpen.groupCodeModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            groupCode:val
          })}
        />
        <SelectSearchInputModal
          isOpen={modalOpen.coaCodeModal}
          filterBy="coa_name"
          placeholder="Search Coa Code"
          subtext="coa_code"
          options={coaOption}
          onClose={()=> setModalOpen({
            ...modalOpen,
            coaCodeModal:!modalOpen.coaCodeModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            coaCode:val
          })}
        />

        <SelectSearchInputModal
          isOpen={modalOpen.productModal}
          filterBy="ItemName"
          placeholder="Search Product"
          subtext="QTY"
          label="QTY On Hand"
          options={productOption}
          onClose={()=> setModalOpen({
            ...modalOpen,
            productModal:!modalOpen.productModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            name:val
          })}
        />
        <SelectSearchInputModal
          isOpen={modalOpen.uomModal}
          filterBy="name"
          placeholder="Search Uom"
          subtext="created_at"
          options={uomOption}
          onClose={()=> setModalOpen({
            ...modalOpen,
            uomModal:!modalOpen.uomModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            uom:val
          })}
        />
    {/* form data */}
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
              type="number"
              value={payload.qty}
              onChange={(val) => setPayload({
                ...payload,
                qty: +val
              })}
            />
          </Box>
          <Box
            sx={{
              width: '50%',
              paddingLeft: '13px',
            }}
          >
            <Box onClick={()=> setModalOpen({
          ...modalOpen,
          uomModal:!modalOpen.uomModal
        })}>
              <CustomSelect
                label="Unit of Measure"
                placeholder="Unit of Measure"
                isDisabled={true}
                isError={false}
                textHelper=""
                value={payload.uom}
                options={convertUomToSelect(uomOption)}
                onChange={(val) => setPayload({
                  ...payload,
                  uom:val
                })}
              />
            </Box>
          </Box>
        </Grid>
        <Box>
          <CustomCheckbox label="Manual Input ?" onClick={()=> setPayload({
            ...payload,
            isManual: !payload.isManual
          })}/>
        </Box>
        {!payload.isManual ? (
          <>
        <Box onClick={()=> setModalOpen({
          ...modalOpen,
          productModal:!modalOpen.productModal
        })}>
          <CustomSelect
            label="Product Name"
            placeholder="Product Name"
            isDisabled={true}
            isError={false}
            textHelper=""
            value={payload.name}
            options={convertProductToSelect(productOption)}
            onChange={(val) => setPayload({
              ...payload,
              name:val
            })}
            />
        </Box>
          </>
        ):(
          <>
          <CustomTextField
          label="Product Name"
          placeholder="Product Name"
          endAdornment=""
          isDisabled={false}
          isError={false}
          textHelper=""
          value={payload.name}
          onChange={(val) => setPayload({
            ...payload,
            name:val
          })}
          />
           <Box onClick={()=> setModalOpen({
          ...modalOpen,
          coaCodeModal:!modalOpen.coaCodeModal
        })}>
          <CustomSelect
            label="Coa Code"
            placeholder="Coa Code"
            isDisabled={true}
            isError={false}
            textHelper=""
            value={payload.coaCode ?? ''}
            options={convertCoaCodeToSelect(coaOption)}
            onChange={(val) => setPayload({
              ...payload,
              coaCode:val
            })}
            />
        </Box>
           <Box onClick={()=> setModalOpen({
          ...modalOpen,
          groupCodeModal:!modalOpen.groupCodeModal
        })}>
          <CustomSelect
            label="Group code"
            placeholder="Group code"
            isDisabled={true}
            isError={false}
            textHelper=""
            value={payload.groupCode ?? ''}
            options={convertToSelect(groupOption, ['id', 'group_name'])}
            onChange={(val) => setPayload({
              ...payload,
              groupCode:val
            })}
            />
        </Box>
          </>
        )}
        <CustomTextField
          label="Requested By"
          placeholder="Requested By"
          endAdornment=""
          isDisabled={true}
          isError={false}
          textHelper=""
          value={payload.requested_by}
          onChange={(val) => setPayload({
            ...payload,
            requested_by:val
          })}
        />
        <CustomTextField
          label="Purpose"
          placeholder="Purpose"
          endAdornment=""
          isDisabled={false}
          isError={false}
          textHelper=""
          value={payload.purpose}
          onChange={(val) => setPayload({
            ...payload,
            purpose:val
          })}
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
              isDisabled={disabledBtn}
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
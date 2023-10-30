'use client';

import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomFileInput from "@/components/inputs/CustomFileInput";
import CustomSelect, { SelectOption } from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import AddMsrProductModal from "@/components/modals/AddMsrProductModal";
import EditMsrProductModal from "@/components/modals/EditMsrProductModal";
import CustomCreateMsrTable from "@/components/tables/CustomCreateMsrTable";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { TitleDashboardText } from "@/components/text/styledText";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export interface SelectedMaterialServiceInterface{
  qty: number;
  uom: string;
  name: string;
  reqBy: string;
  purpose: string;
}

const CreateMsr: React.FC = () => {

  const router = useRouter();

  const selectedProductColumn: CustomTableColumnInterface[] = [
    {
      id: 'no',
      label: 'No',
    },
    {
      id: 'qty',
      label: 'QTY',
    },
    {
      id: 'uom',
      label: 'UOM',
    },
    {
      id: 'productName',
      label: 'Product Name',
    },
    {
      id: 'reqBy',
      label: 'Requested By',
    },
    {
      id: 'purpose',
      label: 'Purpose',
    },
    {
      id: 'action',
      label: 'Action',
    },
  ]

  // states
  const [msrNo, setMsrNo] = React.useState('')
  const [workLocation, setWorkLocation] = React.useState('')
  const [vessel, setVessel] = React.useState('')
  const [vesselOptions] = React.useState<SelectOption[]>(
    [
      {
        label: 'vessel a',
        value: '1'
      },
      {
        label: 'vessel b',
        value: '2'
      },
      {
        label: 'vessel c',
        value: '3'
      },
    ]
  )
  const [projectCode, setProjectCode] = React.useState('')
  const [deliveryDate, setDeliveryDate] = React.useState('')
  const [urgency, setUrgency] = React.useState('')
  const [urgencyOptions] = React.useState<SelectOption[]>(
    [
      {
        label: 'Normal',
        value: '1'
      },
      {
        label: 'Urgent',
        value: '2'
      },
      {
        label: 'Very Urgent',
        value: '3'
      },
    ]
  )
  const [suggestedSupplier, setSuggestedSupplier] = React.useState('')
  const [selectedProducts, setSelectedProducts] = React.useState<SelectedMaterialServiceInterface[]>([
    {
      qty: 100,
      uom: 'PCS',
      name: 'Epson Tinta Print',
      reqBy: 'Dept IT',
      purpose: 'Restocking',
    }
  ])
  const [notes, setNotes] = React.useState('')
  const [acknowledgement, setAcknowledgement] = React.useState('')
  const [attachmentName, setAttachementName] = React.useState('')
  const [attachment, setAttachement] = React.useState({})

  // modal state
  const [addProductOpen, setAddProductOpen] = React.useState(false)
  const [editProductOpen, setEditProductOpen] = React.useState(false)
  const [editProductIndex, setEditProductIndex] = React.useState<number>(-1)
  const [editedProduct, setEditedProduct] = React.useState<SelectedMaterialServiceInterface>({
    name: '',
    purpose: '',
    qty: 0,
    reqBy: '',
    uom: ''
  })

  const handleAddProductModalOpen = () => {
    setAddProductOpen(true);
  }
  const handleAddProductModalClose = () => {
    setAddProductOpen(false);
  }
  const addProduct = (product: SelectedMaterialServiceInterface) => {
    setSelectedProducts(selectedProducts => [...selectedProducts, product])
  }
  const deleteProduct = (i: number) => {
    const newState = [...selectedProducts];
    if (i > -1) {
      newState.splice(i, 1);
      setSelectedProducts(newState);
    }
  }
  const handleEditProductModalOpen = (index: number) => {
    setEditProductOpen(true);
    setEditProductIndex(index);
    setEditedProduct(selectedProducts[index]);
  }
  const handleEditProductModalClose = () => {
    setEditProductOpen(false);
    setEditProductIndex(-1);
    setEditedProduct({
      name: '',
      purpose: '',
      qty: 0,
      reqBy: '',
      uom: ''
    });
  }
  const editProduct = (product: SelectedMaterialServiceInterface, index: number) => {
    // setSelectedProducts(selectedProducts => [...selectedProducts, product])
    const newState = selectedProducts.slice();
    newState[index] = product
    setSelectedProducts(newState);
  }
  

  const handleChangeAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const selectedFiles = files as FileList;
    setAttachement(selectedFiles?.[0]);
    setAttachementName(selectedFiles?.[0].name)
    console.log(attachment)
  }

  return (
    <Grid
      container
      direction={'column'}
      sx={{
        paddingTop: '50px',
        paddingLeft: '80px',
      }}
    >

      {/* modal add & delete product */}
      <AddMsrProductModal
        isOpen={addProductOpen}
        onClose={handleAddProductModalClose}
        onSubmit={(product) => addProduct(product)}
      />
      <EditMsrProductModal
        isOpen={editProductOpen}
        productIndex={editProductIndex}
        product={editedProduct}
        onClose={handleEditProductModalClose}
        onSubmit={(product, index) => editProduct(product, index)}
      />
      
      {/* title & logo */}
      <Image src={mainImage.logoSmallYellow} width={44} height={44} alt="company-logo" />
      <TitleDashboardText sx={{marginTop: '28px'}}>Create Material Services Request</TitleDashboardText>

      {/* form 1 */}
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '80px',
          width: '70%',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomTextField 
            label="MSR NO" 
            placeholder="Enter your MSR NO"
            value={msrNo}
            onChange={(val) => setMsrNo(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomTextField 
            label="Work Location" 
            placeholder="Enter your Work Location"
            value={workLocation}
            onChange={(val) => setWorkLocation(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '24px',
          width: '70%',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomSelect 
            label="Vessel / Site / Dept" 
            placeholder="Enter your Vessel / Site / Dept"
            value={vessel}
            onChange={(val) => setVessel(val)}
            options={vesselOptions}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomTextField 
            label="Project Code" 
            placeholder="Enter your Project Code"
            value={projectCode}
            onChange={(val) => setProjectCode(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '24px',
          width: '70%',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomTextField 
            label="Delivery Date (within)" 
            placeholder="Enter your Delivery Date (within)"
            value={deliveryDate}
            onChange={(val) => setDeliveryDate(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomSelect 
            label="Urgency" 
            placeholder="Enter your Urgency"
            value={urgency}
            onChange={(val) => setUrgency(val)}
            options={urgencyOptions}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '24px',
          width: '70%',
          gap: '20px'
        }}
      >
        <Box
          sx={{width: '100%'}}
        >
          <CustomSelect 
            label="Suggested Supplier" 
            placeholder="Enter your Suggested Supplier"
            value={suggestedSupplier}
            onChange={(val) => setSuggestedSupplier(val)}
            options={[
              {
                label: 'GABRIEL INTI MARINDO',
                value: '1',
              },
              {
                label: 'CAHAYA MULTI SENTOSA',
                value: '2',
              },
              {
                label: 'ASTON SISTEM INDONESIA',
                value: '3',
              },
            ]}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>

      {/* form 2 */}
      <Box
        sx={{
          marginTop: '50px'
        }}
      >
        <CustomCreateMsrTable
          datas={selectedProducts}
          column={selectedProductColumn}
          onClickAdd={handleAddProductModalOpen}
          onClickEdit={(i) => handleEditProductModalOpen(i)}
          onClickDelete={(i) => deleteProduct(i)}
        />
      </Box>

      {/* form 3 */}
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '24px',
          width: '70%',
          gap: '20px'
        }}
      >
        <Box
          sx={{width: '100%'}}
        >
          <CustomTextareaField 
            label="Note"
            placeholder="Enter your note"
            rows={3}
            value={notes}
            onChange={(val) => setNotes(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      <Grid
        container
        direction={'row'}
        sx={{
          marginTop: '24px',
          width: '70%',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomTextField 
            label="Acknowledge By (Dept. Head)" 
            placeholder="Enter your Acknowledge By (Dept. Head)"
            value={acknowledgement}
            onChange={(val) => setAcknowledgement(val)}
            endAdornment=""
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomFileInput 
            label="Attachment" 
            placeholder="File Upload"
            value={attachmentName}
            onChange={(e) => handleChangeAttachment(e)}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>

      {/* submit button */}
      <Box
        sx={{
          marginTop: '35px',
          width: '375px'
        }}
      >
        <CustomContainedButton label="Submit" isDisabled={false} onClick={() => router.push('/material-service-request')} />
      </Box>

    </Grid>
  )
}

export default CreateMsr;
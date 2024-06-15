'use client';
import React from 'react';
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomFileInput from "@/components/inputs/CustomFileInput";
import CustomSelect from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import CustomTextareaField from "@/components/inputs/CustomTextareaField";
import AddMsrProductModal from "@/components/modals/AddMsrProductModal";
import EditMsrProductModal from "@/components/modals/EditMsrProductModal";
import CustomCreateMsrTable from "@/components/tables/CustomCreateMsrTable";
import { TitleDashboardText } from "@/components/text/styledText";
import { Box, Grid } from "@mui/material";
import CustomDatePicker from "@/components/inputs/CustomDatePicker";
import { useCreateMsr } from './@usecase';
import CustomAlert from '@/components/alert';
import SelectSearchInputModal from '@/components/modals/SelectSearchInputModal';
import { convertToSelect } from '@/helpers/converterHelper';
import moment from 'moment';


const CreateMsr: React.FC = () => {
  const {
    groupCodes,
    uoms,
    router,
    addProductOpen,
    setAddProductOpen,
    addProduct,
    editProductOpen,
    editProductIndex,
    editedProduct,
    handleEditProductModalClose,
    editProduct,
    deleteProduct,
    handleChangeAttachment,
    handleEditProductModalOpen,
    handleSubmitForm,
    selectedProductColumn,
    urgencyOptions,
    setPayload,
    payload,
    selectedProducts,
    error,
    product,
    coaCodes,
    depts,
    setModalOpen,
    modalOpen,
    disabledBtn,
    supplyer
  } = useCreateMsr()
  return (
    <Grid
      container
      direction={'column'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingY: '2em',
        paddingX: '2em',
        backgroundColor: 'white',
        borderRadius: '20px',
        gap: '2em'
      }}
    >
      {error && (
        <CustomAlert title='Error' status='error' text='Gagal menambahkan data'/>
      )}
      {/* modal add & delete product */}
      <SelectSearchInputModal
          isOpen={modalOpen.deptModal}
          filterBy="dept_name"
          placeholder="Search Department"
          subtext="created_at"
          options={depts}
          onClose={()=> setModalOpen({
            ...modalOpen,
            deptModal:!modalOpen.deptModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            depts:val
          })}
        />
      <SelectSearchInputModal
          isOpen={modalOpen.supplyerModal}
          filterBy="VendorName"
          placeholder="Search Supplyer"
          subtext="ContactPerson"
          options={supplyer}
          onClose={()=> setModalOpen({
            ...modalOpen,
            supplyerModal:!modalOpen.supplyerModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            suggestedSupplier:val
          })}
        />
      {/* <SelectSearchInputModal
          isOpen={modalOpen.coaCodeModal}
          filterBy="coa_name"
          placeholder="Search Coa Code"
          subtext="coa_code"
          options={coaCodes}
          onClose={()=> setModalOpen({
            ...modalOpen,
            coaCodeModal:!modalOpen.coaCodeModal
          })}
          onChange={(val) => setPayload({
            ...payload,
            coaCode:val
          })}
        /> */}
      <AddMsrProductModal
        groupOption={groupCodes}
        coaOption={coaCodes}
        uomOption={uoms}
        productOption={product}
        isOpen={addProductOpen}
        onClose={()=>setAddProductOpen(!addProductOpen)}
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
      {/* <Image src={mainImage.logoSmall} width={44} height={44} alt="company-logo" /> */}
      <TitleDashboardText>Create Material Services Request</TitleDashboardText>

      {/* form 1 */}

      <Grid
        container
        direction={'row'}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomTextField
            label="MSR NO"
            placeholder="Enter your MSR NO"
            onChange={(val) => setPayload({
              ...payload,
              msr_number: val
            })}
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
            onChange={(val) => setPayload({
              ...payload,
              work_location: val
            })}
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >

      <Box
        sx={{
          width: '50%',
          paddingRight: '10px'
        }}
        onClick={()=> setModalOpen({
          ...modalOpen,
          deptModal:!modalOpen.deptModal
        })}>
              <CustomSelect
                label="Vessel / Site / Dept"
                placeholder="Enter your Vessel / Site / Dept"
                isDisabled={true}
                isError={false}
                textHelper=""
                value={payload.depts}
                options={convertToSelect(depts, ['id', 'dept_name'])}
                onChange={(val) => setPayload({
                  ...payload,
                  depts:val
                })}
              />
            </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomTextField
            label="Project Code"
            placeholder="Enter your Project Code"
            onChange={(val) => setPayload({
              ...payload,
              project_code: val
            })}
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >

          <CustomDatePicker
                isDisabled={false}
                isError={false}
                label="Delivery Date (within)"
                placeholder="Enter your Delivery Date (within)"
                textHelper=""
                value={payload.deliveryDate}
                onChange={(val) => setPayload({
                  ...payload,
                  deliveryDate: val ?? ''
                })}
              />

        </Box>
        <Box
          sx={{width: '50%', paddingLeft: '10px'}}
        >
          <CustomSelect
            label="Urgency"
            placeholder="Enter your Urgency"
            value={payload.urgency}
            onChange={(val) => setPayload({
              ...payload,
              urgency: val
            })}
            options={urgencyOptions}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      <Box
        onClick={()=> setModalOpen({
          ...modalOpen,
          supplyerModal:!modalOpen.supplyerModal
        })}>
              <CustomSelect
                label="Suggestion Supplyer"
                placeholder="Choose a Supplyer"
                isDisabled={true}
                isError={false}
                textHelper=""
                value={payload.suggestedSupplier}
                options={convertToSelect(supplyer, ['id', 'VendorName'])}
                onChange={(val) => setPayload({
                  ...payload,
                  suggestedSupplier:val
                })}
              />
            </Box>

      <Grid sx={{
         display: 'flex',
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'center',
      }}>

      </Grid>

      {/* form 2 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CustomCreateMsrTable
          datas={selectedProducts}
          column={selectedProductColumn}
          onClickAdd={()=> setAddProductOpen(!addProductOpen)}
          onClickEdit={(i) => handleEditProductModalOpen(i)}
          onClickDelete={(i) => deleteProduct(i)}
        />
      </Box>

      {/* form 3 */}
      <Grid
        container
        direction={'row'}
        sx={{
          gap: '20px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{width: '100%'}}
        >
          <CustomTextareaField
            label="Note"
            placeholder="Enter your note"
            rows={3}
            value={payload.notes}
            onChange={(val) => setPayload({
              ...payload,
              notes: val
            })}
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
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{width: '50%', paddingRight: '10px'}}
        >
          <CustomTextField
            label="Acknowledge By (Dept. Head)"
            placeholder="Enter your Acknowledge By (Dept. Head)"
            onChange={(val) => setPayload({
              ...payload,
              acknowledgement: val
            })}
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
            value={payload?.attachment?.name}
            onChange={(e) => handleChangeAttachment(e)}
            isDisabled={false}
            isError={false}
            textHelper=""
          />
        </Box>
      </Grid>
      {/* submit button */}
        <CustomContainedButton type="submit" label="Submit" isDisabled={disabledBtn} onClick={handleSubmitForm} />
    </Grid>
  )
}

export default CreateMsr;
"use client"

import { SelectOption } from "@/components/inputs/CustomSelect";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { AccountData, IRequest, SelectedMaterialServiceInterface, createMsr, getCoaCodes, getDepartament, getGroupCode, getStatusMsr, getSupplyer, getUomQty } from "../../@usecase/handle";
import { getCurrentUser } from "@/helpers/tokenChecker";
import moment from "moment";
import { CustomTableColumnInterface } from "@/components/tables/CustomTable";
import { Dayjs } from "dayjs";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { getInventory, getMasterInventory } from "../../../(master)/master-inventory/@usecase/handler";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { IState, setSelectedInput } from "@/store/msr/slice";
import { ProductInterface } from "@/components/modals/AddMsrProductModal";
import { disableSubmit } from "@/helpers/validationForm";

export interface IPayloadParent {
  msr_number: string;
  work_location: string;
  vessel: string;
  project_code: string;
  deliveryDate: string | Dayjs;
  urgency: string;
  suggestedSupplier: string;
  notes: string;
  acknowledgement: string;
  attachment?: File;
  coaCode: any;
  groupCode: any;
  depts: any;
}
export interface IStateModal{
  coaCodeModal: boolean;
  groupCodeModal: boolean;
  deptModal: boolean;
  supplyerModal: boolean;
}
interface IReturn {
  uoms: any[]
  router : AppRouterInstance
  selectedProductColumn: CustomTableColumnInterface[]
  vesselOptions: SelectOption[]
  urgencyOptions: SelectOption[]
  addProductOpen: boolean
  editProductOpen: boolean
  editProductIndex: number
  editedProduct: SelectedMaterialServiceInterface
  addProduct : (val:SelectedMaterialServiceInterface )=> void
  deleteProduct : (i: number) => void
  handleEditProductModalOpen: (index: number) => void
  handleEditProductModalClose: () => void
  editProduct: (product: SelectedMaterialServiceInterface,  index: number) => void
  handleChangeAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitForm: () => void
  setAddProductOpen: Dispatch<SetStateAction<boolean>>
  setPayload: Dispatch<SetStateAction<IPayloadParent>>
  payload: IPayload,
  selectedProducts: SelectedMaterialServiceInterface[],
  error?: any,
  product:any,
  statusMsr: string[]
  coaCodes: any,
  setModalOpen: Dispatch<SetStateAction<IStateModal>>,
  modalOpen:IStateModal;
  groupCodes: any,
  disabledBtn: boolean,
  depts: any,
  supplyer: any
}

export const useCreateMsr = (): IReturn =>{
  const dispatch = useAppDispatch()
  const {uoms, coaCodes, product, statusMsr, groupCodes, depts, supplyer} = useAppSelector((state)=> state.msr.selected)
  const initialPayload: IPayloadParent = {
    msr_number: '',
    work_location: '',
    vessel: '',
    project_code: '',
    deliveryDate: '',
    urgency: '',
    suggestedSupplier: '',
    notes: '',
    acknowledgement: '',
    attachment: undefined,
    coaCode: '',
    groupCode: '',
    depts: '',
  }
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<IStateModal>({
    coaCodeModal : false,
    groupCodeModal : false,
    deptModal : false,
    supplyerModal: false
  })
  const [payload, setPayload] = useState<IPayloadParent>(initialPayload)
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
      id: 'name',
      label: 'Product Name',
    },
    {
      id: 'requested_by',
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
  const [error, setError] = useState()
  // states

  const [vesselOptions] = useState<SelectOption[]>(
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
  const [urgencyOptions] = useState<SelectOption[]>(
    [
      {
        label: 'Normal',
        value: 'Normal'
      },
      {
        label: 'Urgent',
        value: 'Urgent'
      },
      {
        label: 'Very Urgent',
        value: 'Very Urgent'
      },
    ]
  )
  const [selectedProducts, setSelectedProducts] = useState<SelectedMaterialServiceInterface[]>([])
  // modal state
  const [disabledBtn, setDisabledBtn] = useState<boolean>(false)
  const [addProductOpen, setAddProductOpen] = useState(false)
  const [editProductOpen, setEditProductOpen] = useState(false)
  const [editProductIndex, setEditProductIndex] = useState<number>(-1)
  const [editedProduct, setEditedProduct] = useState<SelectedMaterialServiceInterface>({
    name: '',
    purpose: '',
    qty: 0,
    reqBy: '',
    uom: ''
  })

  const addProduct = (productData: SelectedMaterialServiceInterface) => {
   if (!productData.isManual){
     const addedProduct ={
       ...productData,
       productCode: product?.find((data: ProductInterface) => data.id === productData.name)?.ProductCode
      }
     return setSelectedProducts(selectedProducts => [...selectedProducts, addedProduct])
    }
    return setSelectedProducts(selectedProducts => [...selectedProducts, productData])
  }
  const deleteProduct = (i: number) => {
    const newState = [...selectedProducts];
    if (i > -1) {
      newState.splice(i, 1);
      setSelectedProducts(newState);
    }
  }
  const handleEditProductModalOpen = (index: number) => {
    // setEditProductOpen(true);
    setAddProductOpen(!addProductOpen)
    setEditProductIndex(index);
    // setEditedProduct(selectedProducts[index]);
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
    setPayload({
      ...payload,
      attachment: selectedFiles?.[0]
    })
  }

  const handleSubmitForm = async () =>{
    const getToken = await getCurrentUser()
    const req : IRequest={
          date_time: moment(payload.deliveryDate).utc().format('YYYY-MM-DD').toString(),
          dept_id: getToken.data.data.dept_id,
          list_of_items: selectedProducts,
          msr_number: payload.msr_number,
          project_code: payload.project_code,
          status: "WAITING_FOR_VAL_FORM_COST_CONTROL",
          urgentcy: payload.urgency.toUpperCase(),
          work_location: payload.work_location,
          suggestedSupplier: payload.suggestedSupplier
        }
        console.log('request data >>', req)
    const res = await createMsr(req)
    if (res.responseCode === "99") return setError(res)
    // return router.replace('/material-service-request')
  }

  const SelectedInitialData = async () =>{
    const uom =  await getUomQty()
    const inventorys = await getInventory()
    const statusMsr = await getStatusMsr()
    const coaCodes: AccountData = await getCoaCodes()
    const groupCodes = await getGroupCode()
    console.log('GROUP DATA >>', groupCodes)
    const depts = await getDepartament()
    const supplyer = await getSupplyer()
    dispatch(setSelectedInput({
      uoms: uom.data,
      product: inventorys.data,
      statusMsr: statusMsr.data,
      coaCodes: coaCodes.data,
      groupCodes: groupCodes.data,
      depts: depts.data,
      supplyer: supplyer.data
    }))
  }

  useEffect(() => {
    setDisabledBtn(disableSubmit(payload));
  }, [payload]);
  useEffect(()=>{
  SelectedInitialData()
  },[])

  return {
    groupCodes,
    uoms,
    router,
    selectedProductColumn,
    vesselOptions,
    urgencyOptions,
    addProductOpen,
    editProductOpen,
    editProductIndex,
    editedProduct,
    addProduct,
    deleteProduct,
    handleEditProductModalOpen,
    handleEditProductModalClose,
    editProduct,
    handleChangeAttachment,
    handleSubmitForm,
    setAddProductOpen,
    setPayload,
    payload,
    selectedProducts,
    error,
    product,
    statusMsr,
    coaCodes,
    depts,
    setModalOpen,
    modalOpen,
    disabledBtn,
    supplyer
  }
}
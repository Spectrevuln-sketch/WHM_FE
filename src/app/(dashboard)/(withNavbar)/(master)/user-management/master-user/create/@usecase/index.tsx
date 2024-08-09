'use client'

import { apiRequest } from "@/config/api"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { cookies } from "next/headers";

interface ISelected {
    departement: []
    divisi: []
    direktorat: []
    levelJabatan: []
    position: []
}
interface IState {
    workLocation: string
    name: string
    direktorat: string
    divisi: string
    departement: string
    levelJabatan: string
    position: string
}

interface IModal {
    departement: boolean
    divisi: boolean
    levelJabatan: boolean
    position: boolean
    direktorat: boolean
}
interface IReturn {
    state: IState
    setState: Dispatch<SetStateAction<IState>>
    modal: IModal
    setModal: Dispatch<SetStateAction<IModal>>
    selected: ISelected
    setSelected: Dispatch<SetStateAction<ISelected>>
}

export const useMasterUser = (): IReturn =>{
    const initialState: IState = {
        workLocation: "",
        name: "",
        direktorat: "",
        divisi: "",
        departement: "",
        levelJabatan: "",
        position: "",
    }
    const [state, setState] = useState<IState>(initialState)
    const initialModal: IModal = {
        departement: false,
        direktorat: false,
        divisi: false,
        levelJabatan: false,
        position: false
    }
    const [modal, setModal] = useState<IModal>(initialModal)
    const initialSelected: ISelected = {
        departement: [],
        direktorat: [],
        divisi:[],
        levelJabatan: [],
        position: []   
    }
    const [selected, setSelected] = useState<ISelected>(initialSelected)

    const ServiceReq = async () =>{
        const token = cookies().get('token')?.value;
        const departement = await apiRequest.v1.get('/depts', {
            headers:{
                'Authorization': 'Bearer ' + token
              } 
        });
        const levelJabatan = await apiRequest.v1.get('/jabatans', {
            headers:{
                'Authorization': 'Bearer ' + token
              } 
        })
        const position = await apiRequest.v1.get('/positions', {
            headers:{
                'Authorization': 'Bearer ' + token
              } 
        })
        const divisis = await apiRequest.v1.get('/divisis', {
            headers:{
                'Authorization': 'Bearer ' + token
              } 
        })
        setSelected({
            ...selected,
            departement: departement.data.data,
            levelJabatan: levelJabatan.data.data,
            position: position.data.data,
            divisi: divisis.data.data,
        })

    }
    useEffect(()=>{
        ServiceReq()
    },[])
    return {
        state, 
        setState,
        modal,
        setModal,
        selected,
        setSelected
    }
}
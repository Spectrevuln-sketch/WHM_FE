'use client'
import CustomTextField from '@/components/inputs/CustomTextField'
import { Box} from '@mui/material'
import React from 'react'
import { useMasterUser } from './@usecase'
import CustomSelect from '@/components/inputs/CustomSelect'
import { convertToSelect } from '@/helpers/converterHelper'
import SelectSearchInputModal from '@/components/modals/SelectSearchInputModal'
import { parseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const UserCreate = () => {
  const {state, setState, modal, setModal, selected, setSelected} = useMasterUser()
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffff',
        borderRadius: '5px',
        padding: '20px',
    }}>
        <Box gap={4} sx={{
            display: 'flex',
            flexDirection: 'column',
        }}>
            <p>Create User</p>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box gap={5} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <CustomTextField
                        type="text"
                        label="Work Location"
                        placeholder="Location"
                        onChange={(val) => setState({...state, workLocation: String(val)})}
                        endAdornment=""
                        isDisabled={false}
                        isError={false}
                        textHelper=""
                    />
                    <CustomTextField
                        type="text"
                        label="Name"
                        placeholder="Name"
                        onChange={(val) => setState({...state, workLocation: String(val)})}
                        endAdornment=""
                        isDisabled={false}
                        isError={false}
                        textHelper=""
                    />
                </Box>
                <Box gap={5} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Box
                        sx={{
                        width: '50%',
                        paddingRight: '10px'
                        }}
                        onClick={()=> setModal({
                        ...modal,
                        direktorat:!modal.direktorat
                        })}>
                            <CustomSelect
                                label="Direktorat"
                                placeholder="Enter your Direktorat"
                                isDisabled={true}
                                isError={false}
                                textHelper=""
                                value={state.direktorat}
                                options={convertToSelect(selected.direktorat, ['id', 'name'])}
                                onChange={(val) => setState({
                                ...state,
                                direktorat:val
                                })}
                            />
                    </Box>
                </Box>
                <Box gap={5} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Box
                        sx={{
                        width: '50%',
                        paddingRight: '10px'
                        }}
                        onClick={()=> setModal({
                        ...modal,
                        position:!modal.position
                        })}>
                            <CustomSelect
                                label="Position"
                                placeholder="Enter your Position"
                                isDisabled={true}
                                isError={false}
                                textHelper=""
                                value={state.position}
                                options={convertToSelect(selected.position, ['id', 'name'])}
                                onChange={(val) => setState({
                                ...state,
                                position:val
                                })}
                            />
                    </Box>
                    
                </Box>
                <Box gap={5} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Box
                        sx={{
                        width: '50%',
                        paddingRight: '10px'
                        }}
                        onClick={()=> setModal({
                        ...modal,
                        departement:!modal.departement
                        })}>
                            <CustomSelect
                                label="Vessel / Site / Dept"
                                placeholder="Enter your Vessel / Site / Dept"
                                isDisabled={true}
                                isError={false}
                                textHelper=""
                                value={state.departement}
                                options={convertToSelect(selected.departement, ['id', 'dept_name'])}
                                onChange={(val) => setState({
                                ...state,
                                departement:val
                                })}
                            />
                    </Box>
                    <Box
                        sx={{
                        width: '50%',
                        paddingRight: '10px'
                        }}
                        onClick={()=> setModal({
                        ...modal,
                        levelJabatan:!modal.levelJabatan
                        })}>
                            <CustomSelect
                                label="Level Jabatan"
                                placeholder="Level Jabatan"
                                isDisabled={true}
                                isError={false}
                                textHelper=""
                                value={state.levelJabatan}
                                options={convertToSelect(selected.levelJabatan, ['id', 'name'])}
                                onChange={(val) => setState({
                                ...state,
                                levelJabatan:val
                                })}
                            />
                    </Box>
                   
                    
                </Box>
                <Box gap={5} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Box
                        sx={{
                        width: '50%',
                        paddingRight: '10px'
                        }}
                        onClick={()=> setModal({
                        ...modal,
                        divisi:!modal.divisi
                        })}>
                            <CustomSelect
                                label="Division"
                                placeholder="Enter your Division"
                                isDisabled={true}
                                isError={false}
                                textHelper=""
                                value={state.divisi}
                                options={convertToSelect(selected.divisi, ['id', 'name'])}
                                onChange={(val) => setState({
                                ...state,
                                divisi:val
                                })}
                            />
                    </Box>
                   
                   
                    
                </Box>
            </Box>
        </Box>
        {/* Modal Search Select Input */}
        <SelectSearchInputModal
          isOpen={modal.departement}
          filterBy="dept_name"
          placeholder="Search Departement"
          subtext="created_at"
          options={selected.departement}
          onClose={()=> setModal({
            ...modal,
            departement:!modal.departement
          })}
          onChange={(val) => setState({
            ...state,
            departement:val
          })}
          />
        <SelectSearchInputModal
          isOpen={modal.divisi}
          filterBy="name"
          placeholder="Search Divisi"
          subtext="created_at"
          options={selected.divisi}
          onClose={()=> setModal({
            ...modal,
            divisi:!modal.divisi
          })}
          onChange={(val) => setState({
            ...state,
            divisi:val
          })}
          />
        <SelectSearchInputModal
          isOpen={modal.position}
          filterBy="name"
          placeholder="Search position"
          subtext="created_at"
          options={selected.position}
          onClose={()=> setModal({
            ...modal,
            position:!modal.position
          })}
          onChange={(val) => setState({
            ...state,
            position:val
          })}
          />
        <SelectSearchInputModal
          isOpen={modal.levelJabatan}
          filterBy="name"
          placeholder="Search levelJabatan"
          subtext="created_at"
          options={selected.levelJabatan}
          onClose={()=> setModal({
            ...modal,
            levelJabatan:!modal.levelJabatan
          })}
          onChange={(val) => setState({
            ...state,
            levelJabatan:val
          })}
          />
        <SelectSearchInputModal
          isOpen={modal.direktorat}
          filterBy="name"
          placeholder="Search direktorat"
          subtext="created_at"
          options={selected.direktorat}
          onClose={()=> setModal({
            ...modal,
            direktorat:!modal.direktorat
          })}
          onChange={(val) => setState({
            ...state,
            direktorat:val
          })}
          />
          {/* END Modal Search Select Input */}
    </Box>
  )
}

export const getServerSideProps = async (ctx)=>{
    const cookies = parseCookie(ctx);
    const cookieValue = cookies['token'] || '';
    return {
        props: {
          cookieValue,
        },
      };
}

export default UserCreate
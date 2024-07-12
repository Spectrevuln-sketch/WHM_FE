'use client'

import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import CustomPasswordField from "@/components/inputs/CustomPasswordField";
import CustomSelect, { SelectOption } from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import { TitleDashboardText } from "@/components/text/styledText";
import { Box, Grid, SelectChangeEvent } from "@mui/material";
import Image from "next/image";
import React from "react";

type UserForm = {
  fullname: string;
  username: string;
  email: string;
  dept: string;
  phone: string;
  role: string;
  password: string;
}

const dummyDeptOptions: SelectOption[] = [
  {
    value: '1',
    label: 'IT'
  },
]
const dummyroleOptions: SelectOption[] = [
  {
    value: '1',
    label: 'Admin'
  },
  {
    value: '2',
    label: 'User'
  },
]

const CreateUser: React.FC = () => {

  const [userForm, setUserForm] = React.useState<UserForm>({
    fullname: '',
    username: '',
    email: '',
    dept: '',
    phone: '',
    role: '',
    password: '',
  })

  const [deptOptions, setDeptOptions] = React.useState<SelectOption[]>([])
  const [roleOptions, setRoleOptions] = React.useState<SelectOption[]>([])

  React.useEffect(() => {
    setDeptOptions(dummyDeptOptions);
    setRoleOptions(dummyroleOptions)
  }, [])

  const handleChangeForm = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined) => {
    setUserForm({
      ...userForm,
      [e!.currentTarget.name]: e!.currentTarget.value
    })
  }

  const handleChangeSelectForm = (e: SelectChangeEvent<string> | undefined) => {
    setUserForm({
      ...userForm,
      [e!.target.name]: e!.target.value
    })
  }

  // form validation
  const validator = ['', null, undefined, false, 0, '0'];

  const submitConditionArray = [
    validator?.includes(userForm.fullname),
    validator?.includes(userForm.username),
    validator?.includes(userForm.email),
    validator?.includes(userForm.phone),
    validator?.includes(userForm.role),
    validator?.includes(userForm.password),
  ]

  const disableSubmit = React.useMemo(() => {
    if (!submitConditionArray?.includes(true)) {
      return false;
    } else {
      return true;
    }
  }, [
    userForm
  ]);

  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'100vh'}
      width={'100vw'}
      paddingBottom={'46px'}
      sx={{
        backgroundImage: `url('/images/auth/auth-banner.png')`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Box></Box>
      <Grid
        container
        direction={'column'}
        alignItems={'center'}
      >

        {/* <Image width={68} height={68} src={mainImage.logoSmall} alt='company-logo' /> */}
        <TitleDashboardText sx={{color: '#fff', marginTop: '25px'}}>Create a new account</TitleDashboardText>

        <Grid
          container
          direction={'column'}
          gap={'14px'}
          width={'675px'}
          marginTop={'70px'}
        >

          <Grid
            container
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Box width={'330px'}>
              <CustomTextField
                label="Full Name"
                name="fullname"
                placeholder="Enter your full name"
                value={userForm.fullname}
                color='white'
                onChange={(val, e) => handleChangeForm(e)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomTextField
                label="Username"
                name="username"
                placeholder="Enter your username"
                value={userForm.username}
                color='white'
                onChange={(val, e) => handleChangeForm(e)}
              />
            </Box>
          </Grid>
          <Grid
            container
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Box width={'330px'}>
              <CustomTextField
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={userForm.email}
                color='white'
                onChange={(val, e) => handleChangeForm(e)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomSelect
                label="Vessel / Site / Dept"
                name="dept"
                placeholder="Enter your Vessel / Site / Dept"
                color='white'
                value={userForm.dept}
                options={deptOptions}
                onChange={(val, e) => handleChangeSelectForm(e)}
              />
            </Box>
          </Grid>
          <Grid
            container
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Box width={'330px'}>
              <CustomTextField
                label="Phone Number"
                name="phone"
                placeholder="Enter yout phone number"
                value={userForm.phone}
                color='white'
                onChange={(val, e) => handleChangeForm(e)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomSelect
                label="Roles"
                name="role"
                placeholder="Enter your roles"
                color='white'
                value={userForm.role}
                options={roleOptions}
                onChange={(val, e) => handleChangeSelectForm(e)}
              />
            </Box>
          </Grid>
          <CustomPasswordField
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={userForm.password}
            color='white'
            onChange={(val, e) => handleChangeForm(e)}
            />
          <Box marginTop={'15px'}>
            <CustomContainedButton isDisabled={disableSubmit} label="Create User" onClick={() => console.log('submit')} />
          </Box>

        </Grid>

      </Grid>

      {/* privacy policy */}
      <Box>
        <CustomTextButton label='Privacy Policy' icon={<></>} color='#898790' isDisabled={false} onClick={() => console.log('privacy & policy')} />
      </Box>
    </Grid>
  )
}

export default CreateUser;
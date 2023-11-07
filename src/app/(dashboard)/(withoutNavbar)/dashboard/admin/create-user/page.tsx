'use client'

import { mainImage } from "@/assets/images";
import CustomContainedButton from "@/components/buttons/CustomContainedButton";
import CustomTextButton from "@/components/buttons/CustomTextButton";
import CustomPasswordField from "@/components/inputs/CustomPasswordField";
import CustomSelect from "@/components/inputs/CustomSelect";
import CustomTextField from "@/components/inputs/CustomTextField";
import { TitleDashboardText } from "@/components/text/styledText";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";

const CreateUser: React.FC = () => {
  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={'100vh'}
      width={'100vw'}
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

        <Image width={68} height={68} src={mainImage.logoSmallYellow} alt='company-logo' />
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
                placeholder="Enter your full name"
                value=""
                color='white'
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomTextField
                label="Username"
                placeholder="Enter your username"
                value=""
                color='white'
                onChange={(val) => console.log(val)}
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
                placeholder="Enter your email"
                value=""
                color='white'
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomSelect
                label="Vessel / Site / Dept"
                placeholder="Enter your Vessel / Site / Dept"
                color='white'
                value=""
                options={[]}
                onChange={(val) => console.log(val)}
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
                placeholder="Enter yout phone number"
                value=""
                color='white'
                onChange={(val) => console.log(val)}
              />
            </Box>
            <Box width={'330px'}>
              <CustomSelect
                label="Roles"
                placeholder="Enter your roles"
                color='white'
                value=""
                options={[]}
                onChange={(val) => console.log(val)}
              />
            </Box>
          </Grid>
          <CustomPasswordField
            label="Password"
            placeholder="Enter your password"
            value=""
            color='white'
            onChange={(val) => console.log(val)}
          />
          <Box marginTop={'15px'}>
            <CustomContainedButton label="Create User" onClick={() => console.log('submit')} />
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
'use client';

import { mainImage } from '@/assets/images';
import CustomContainedButton from '@/components/buttons/CustomContainedButton';
import CustomTextButton from '@/components/buttons/CustomTextButton';
import CustomPasswordField from '@/components/inputs/CustomPasswordField';
import CustomSelect from '@/components/inputs/CustomSelect';
import CustomTextField from '@/components/inputs/CustomTextField';
import LoginSwiper from '@/components/swiper/LoginSwiper';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import React from 'react';
import { useLogin } from './@usecase';

export default function Login(): React.JSX.Element {

  // const router = useRouter();
  const {initialState, setInitalState, payload, handleClickPrivacyPolicy, setPayload, handleClickSignIn} = useLogin();

  return (
    <Grid
      container
      component="main"
      direction={'row'}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* left wrapper */}
      <Box
        sx={{
          position: 'relative',
          width: '40%',
        }}
      >
        <Grid
        container
        direction={'column'}
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '40px'
        }}
        >

          {/* select language */}
          <Box
            sx={{
              display: 'flex',
              alignSelf: 'flex-end',
              width: '125px'
            }}
          >
            <CustomSelect
              label=''
              placeholder='language'
              value={initialState.lang}
              isDisabled={false}
              isError={false}
              textHelper=''
              options={[
                {
                  value: 'en',
                  label: 'English',
                },
                {
                  value: 'id',
                  label: 'Indonesia'
                }
              ]}
              onChange={(e) => setInitalState({
                ...initialState,
                lang:e
              })}
            />
          </Box>

          {/* login form */}
          <Grid
            container
            direction={'column'}
            sx={{
              width: '70%',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Image width={68} height={68} src={mainImage.logoSmall} alt='company-logo' />
            </Box>
            <Box
              sx={{
                marginTop: '38px',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '20px',
                }}
              >
                Log in to your account
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '55px',
                width: '100%'
              }}
            >
              <CustomTextField
                label='username'
                placeholder='username'
                isDisabled={false}
                isError={false}
                textHelper=''
                endAdornment=''
                onChange={(val) => setPayload({
                  ...payload,
                  username:val
                })}
              />
            </Box>
            <Box
              sx={{
                marginTop: '38px',
                width: '100%'
              }}
            >
              <CustomPasswordField
                label='password'
                placeholder='password'
                isDisabled={false}
                isError={false}
                textHelper=''
                onChange={(val) =>setPayload({
                  ...payload,
                  password:val
                })}
              />
            </Box>
            <Box
              sx={{
                marginTop: '38px',
                width: '100%'
              }}
            >
              <CustomContainedButton isDisabled={initialState.disabledButton} label='Sign In' onClick={()=>handleClickSignIn(payload)} />
            </Box>
          </Grid>

          {/* privacy policy */}
          <Box>
            <CustomTextButton label='Privacy Policy' icon={<></>} color='#898790' isDisabled={false} onClick={() => handleClickPrivacyPolicy()} />
          </Box>

        </Grid>
      </Box>
      {/* right wrapper */}
      <Box
        sx={{
          position: 'relative',
          width: '60%',
        }}
      >
        <LoginSwiper />
      </Box>
    </Grid>
  );
}
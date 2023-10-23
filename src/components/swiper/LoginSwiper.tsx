// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { loginImage } from '@/assets/images/login';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './LoginSwiper.css';

// import Swiper core and required modules
import { Box, Typography } from '@mui/material';
import { A11y, Pagination } from 'swiper/modules';

const LoginSwiper = () => {
  return (
    <Swiper
      modules={[Pagination, A11y]}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <SwiperSlide
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Image
          fill
          src={loginImage.loginBanner}
          alt='login-banner'
        />
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            bottom: '100px',
          }}
        >
          <Typography
            component='div'
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '36px',
              lineHeight: '45px',
              letterSpacing: '0.43px',
              color: '#FFFFFF',
            }}
          >
            WE ARE A <br/> MARINECONSTRUCTION <span style={{color: '#F7C113'}}>EXPERT</span>
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Image
          fill
          src={loginImage.loginBanner2}
          alt='login-banner'
        />
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            bottom: '100px',
          }}
        >
          <Typography
            component='div'
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '36px',
              lineHeight: '45px',
              letterSpacing: '0.43px',
              color: '#FFFFFF',
            }}
          >
            WE ARE A <br/> MARINECONSTRUCTION <span style={{color: '#F7C113'}}>EXPERT</span>
          </Typography>
        </Box>
      </SwiperSlide>
      <SwiperSlide
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Image
          fill
          src={loginImage.loginBanner3}
          alt='login-banner'
        />
        <Box
          sx={{
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            bottom: '100px',
          }}
        >
          <Typography
            component='div'
            sx={{
              textAlign: 'center',
              fontWeight: 500,
              fontSize: '36px',
              lineHeight: '45px',
              letterSpacing: '0.43px',
              color: '#FFFFFF',
            }}
          >
            WE ARE A <br/> MARINECONSTRUCTION <span style={{color: '#F7C113'}}>EXPERT</span>
          </Typography>
        </Box>
      </SwiperSlide>
    </Swiper>
  );
};

export default LoginSwiper;
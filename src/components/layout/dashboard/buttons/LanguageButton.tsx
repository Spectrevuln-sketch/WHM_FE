import { dashboardHeaderImages } from '@/assets/images/dashboard/header';
import { IconButton } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';

interface LanguageButtonInterface {
  language: string,
  onClick: () => void;
}

const LanguageButton: React.FC<LanguageButtonInterface> = ({onClick}) => {
  return (
    <IconButton onClick={onClick} sx={{overflow: 'hidden', marginX: '7px'}} size='small'>
      <div
        style={{
          width: '20px',
          height: '20px',
        }}
      >
        <Image src={dashboardHeaderImages.languageButton} alt='language-button' fill objectFit='cover' />
      </div>
    </IconButton>
  );
}

export default LanguageButton
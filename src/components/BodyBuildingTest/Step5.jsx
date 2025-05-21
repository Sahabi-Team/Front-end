import React, { useEffect } from 'react';
import { Grid, Box, } from '@mui/material';

import male1 from '../../assets/imgs/body_shapes/male/Select Field 1.svg';
import male2 from '../../assets/imgs/body_shapes/male/Select Field 2.svg';
import male3 from '../../assets/imgs/body_shapes/male/Select Field 3.svg';
import male4 from '../../assets/imgs/body_shapes/male/Select Field 4.svg';
import male5 from '../../assets/imgs/body_shapes/male/Select Field 5.svg';
import male6 from '../../assets/imgs/body_shapes/male/Select Field 6.svg';

import female1 from '../../assets/imgs/body_shapes/female/Select Field 1.svg';
import female2 from '../../assets/imgs/body_shapes/female/Select Field 2.svg';
import female3 from '../../assets/imgs/body_shapes/female/Select Field 3.svg';
import female4 from '../../assets/imgs/body_shapes/female/Select Field 4.svg';
import female5 from '../../assets/imgs/body_shapes/female/Select Field 5.svg';
import female6 from '../../assets/imgs/body_shapes/female/Select Field 6.svg';

const Step5 = ({ gender, data, setData, setIsFormValid }) => {
  const maleImages = [male1, male2, male3, male4, male5, male6];
  const femaleImages = [female1, female2, female3, female4, female5, female6];

  const selectedImages = gender === 'male' ? maleImages : femaleImages;

  useEffect(() => {
    setIsFormValid(data !== null);
  }, [data, setIsFormValid]);

  const handleSelect = (index) => {
    setData(index);
  };

  return (
    <>
   <Grid container spacing={2} justifyContent="center">
  {selectedImages.map((imgSrc, index) => (
    <Grid item xs={6} sm={4} md={4} key={index}>
      <Box
        onClick={() => handleSelect(index)}
        sx={{
          border: data === index ? '2px solid #00A359' : '1px solid #00A359',
          borderRadius: 3,
          p: 1,
          cursor: 'pointer',
          transition: '0.3s',
          backgroundColor: data === index ? '#e3f2fd' : 'white',
        }}
      >
        <img
          src={imgSrc}
          alt={`form ${index + 1}`}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Grid>
  ))}
</Grid>


    </>
  );
};

export default Step5;

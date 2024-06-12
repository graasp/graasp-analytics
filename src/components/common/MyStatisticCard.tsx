import React from 'react';

import { Box, Typography, styled } from '@mui/material';

type Props = {
  title: string;
  stat: number;
};

const StyledCardBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(228, 224, 228, 0.61)',
  borderRadius: theme.spacing(2),
  color: '#808080',
  flex: 1,
}));

const MyStatisticCard = ({ title, stat }: Props): JSX.Element => {
  return (
    <StyledCardBox>
      <Typography fontWeight={700}>{title}</Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          fontWeight: 900,
          color: '#7F82CD',
        }}
      >
        {stat}
      </Box>
    </StyledCardBox>
  );
};

export default MyStatisticCard;

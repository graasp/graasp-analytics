import { useContext } from 'react';

import { Grid } from '@mui/material';

import { DataContext } from '@/components/context/DataProvider';
import { hooks } from '@/config/queryClient';

import AppContent from './AppsData';

const AppsAnalytics = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();

  const { itemData: item } = useContext(DataContext);
  if (item) {
    return (
      <Grid container>
        {' '}
        <AppContent item={item} member={member} />{' '}
      </Grid>
    );
  }
  return <div>no item found</div>;
};

export default AppsAnalytics;

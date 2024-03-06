import { useContext } from 'react';

import { Grid } from '@mui/material';

import { AppItemType } from '@graasp/sdk';

import { DataContext } from '@/components/context/DataProvider';
import { hooks } from '@/config/queryClient';

import AppContent from './AppsContent';

const AppsAnalytics = (): JSX.Element => {
  const { data: member } = hooks.useCurrentMember();
  const { descendantsApps } = useContext(DataContext);

  return (
    <Grid container mt={2}>
      {descendantsApps.map((item) => (
        <Grid item key={item.id} xs={12}>
          <AppContent item={item as AppItemType} member={member} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AppsAnalytics;

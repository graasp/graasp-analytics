import React from 'react';
import Grid from '@material-ui/core/Grid';
import ActionsByDayChart from '../charts/ActionsByDayChart';
import ActionsByDayChartZoom from '../charts/ActionsByDayChartZoom';
import ActionsMap from '../charts/ActionsMap';
import ActionsByTimeOfDayChart from '../charts/ActionsByTimeOfDayChart';
import ActionsByUserChart from '../charts/ActionsByUserChart';
import ActionsByVerbChart from '../charts/ActionsByVerbChart';
import ActionsByTypeChart from '../charts/ActionsByTypeChart';
import ItemByActionChart from '../charts/ItemByActionChart';
import ItemByUserChart from '../charts/ItemByUserChart';

const ChartsArea = () => (
  <Grid container>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByDayChartZoom />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsMap />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByTimeOfDayChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByVerbChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByUserChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ItemByActionChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ItemByUserChart />
    </Grid>
    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
      <ActionsByTypeChart />
    </Grid>
  </Grid>
);

export default ChartsArea;

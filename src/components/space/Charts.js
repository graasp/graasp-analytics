import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChartsHeader from './ChartsHeader';
import ActionsChart from './ActionsChart';
import ActionsMap from './ActionsMap';

function Charts() {
  return (
    <div>
      <ChartsHeader />
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsChart />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <ActionsMap />
        </Grid>
      </Grid>
    </div>
  );
}

export default Charts;
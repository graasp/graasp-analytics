import { useContext } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

import { Box, Grid, Skeleton } from '@mui/material';

import StyledAlert from '@/components/common/StyledAlert';
import { DataContext } from '@/components/context/DataProvider';
import { ViewDataContext } from '@/components/context/ViewDataProvider';
import ActionsLegend from '@/components/space/charts-layout/ActionsLegend';
import ChartsAlerts from '@/components/space/charts-layout/ChartsAlerts';
import ChartsHeader from '@/components/space/charts-layout/ChartsHeader';
import { CONTAINER_HEIGHT } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';
import {
  buildAppsAnalyticsPath,
  buildExportAnalyticsPath,
} from '@/config/paths';

const ItemPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { view } = useContext(ViewDataContext);
  const { error, isLoading, actions } = useContext(DataContext);
  const { pathname } = useLocation();
  const { itemId } = useParams();

  const isAppAnalytics = pathname === buildAppsAnalyticsPath(itemId);
  const isExportAnalytics = pathname === buildExportAnalyticsPath(itemId);

  if (!error && !isLoading) {
    const types = [...new Set(actions.map((a) => a.type))];

    return (
      <>
        {!isAppAnalytics && !isExportAnalytics && (
          <>
            <ChartsHeader />
            <ChartsAlerts />
          </>
        )}
        <Outlet />
        <ActionsLegend actionsTypes={types} />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {!isAppAnalytics && <ChartsHeader />}
        <Grid container spacing={2} p={2}>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height={CONTAINER_HEIGHT} />
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {!isAppAnalytics && <ChartsHeader />}
      <Box pl={2} pr={2} mb={2} flexGrow={1}>
        <StyledAlert severity="error">
          {t('GET_ITEM_ERROR', { view })}
        </StyledAlert>
      </Box>
    </>
  );
};

export default ItemPage;

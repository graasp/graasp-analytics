import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';

import { CONTAINER_HEIGHT } from '../../config/constants';
import SectionTitle from '../common/SectionTitle';
import StyledAlert from '../common/StyledAlert';
import { DataContext } from '../context/DataProvider';
import { ViewDataContext } from '../context/ViewDataProvider';
import ChartsAlerts from './charts-layout/ChartsAlerts';
import ChartsArea from './charts-layout/ChartsArea';
import ChartsHeader from './charts-layout/ChartsHeader';
import GeneralAnalytics from './charts-layout/GeneralAnalytics';

const ChartsLayout = () => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { error, isLoading } = useContext(DataContext);

  return (
    <div>
      <ChartsHeader />
      {error && (
        <Box pl={2} pr={2} mb={2} flexGrow={1}>
          <StyledAlert severity="error">
            {t("There was an error retrieving this item's data.", { view })}
          </StyledAlert>
        </Box>
      )}
      {isLoading && (
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
      )}

      {!error && !isLoading && (
        <>
          <ChartsAlerts />
          <div id="general">
            <SectionTitle title={t('General Analytics')} />
            <GeneralAnalytics />
          </div>
          <div id="contents" hidden>
            <SectionTitle title={t('Contents Analytics')} />
          </div>
          <div id="actions">
            <SectionTitle title={t('Actions Analytics')} />
            <ChartsArea />
          </div>
          <div id="chats" hidden>
            <SectionTitle title={t('Chats Analytics')} />
          </div>
          <div id="apps" hidden>
            <SectionTitle title={t('Apps Analytics')} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChartsLayout;

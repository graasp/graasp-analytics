import React from 'react';

import { Box } from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import ChartsAlerts from '@/components/space/charts-layout/ChartsAlerts';
import ChartsHeader from '@/components/space/charts-layout/ChartsHeader';
import ItemsAnalytics from '@/components/space/charts-layout/ItemsAnalytics';
import { useAnalyticsTranslation } from '@/config/i18n';

const ItemAnalyticPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  return (
    <Box>
      <ChartsHeader />
      <ChartsAlerts />
      <SectionTitle title={t('ITEMS_ANALYTICS_TITLE')} />
      <ItemsAnalytics />
    </Box>
  );
};

export default ItemAnalyticPage;

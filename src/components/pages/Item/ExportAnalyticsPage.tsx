import React from 'react';

import { Container, Stack, Typography } from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import ExportData from '@/components/space/functionality/ExportData';
import { useAnalyticsTranslation } from '@/config/i18n';

const ExportAnalyticsPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  return (
    <Container>
      <Stack paddingY={2} spacing={2} alignItems="center">
        <SectionTitle title={t('EXPORT_ANALYTICS_TITLE')} />
        <Typography variant="body1" whiteSpace="pre-line">
          {t('EXPORT_ANALYTICS_DESCRIPTION')}
        </Typography>
        <ExportData />
      </Stack>
    </Container>
  );
};

export default ExportAnalyticsPage;

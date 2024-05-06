import { useState } from 'react';

import { Alert, Box, Container, Stack } from '@mui/material';

import { Loader } from '@graasp/ui';

import { addDays, formatISO } from 'date-fns';

import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { groupActionsByWeeks } from '@/utils/utils';

import DateRange from '../common/DateRange';
import SectionTitle from '../common/SectionTitle';
import MemberActionsChart from '../space/charts/MemberActionsChart';

const GeneralStatisticsPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const [dateRange, setDateRange] = useState({
    startDate: addDays(new Date(), -30),
    endDate: new Date(),
    key: 'selection',
  });

  const { data, isLoading } = hooks.useMemberActions({
    startDate: formatISO(dateRange.startDate),
    endDate: formatISO(dateRange.endDate),
  });

  if (data) {
    const actionsGroupedByWeekStart = groupActionsByWeeks(data);

    return (
      <Box p={2}>
        <Container>
          <Stack direction="row" justifyContent="space-between">
            <SectionTitle title={t('GENERAL_STATISTICS_TITLE')} />
            <DateRange dateRange={dateRange} setDateRange={setDateRange} />
          </Stack>
          <MemberActionsChart
            actionsGroupedByWeekStart={actionsGroupedByWeekStart}
          />
        </Container>
      </Box>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
};

export default GeneralStatisticsPage;

import { useState } from 'react';

import { Alert, Box, Container, Stack, Typography } from '@mui/material';

import { Loader } from '@graasp/ui';

import { addDays, formatISO } from 'date-fns';
import { groupBy } from 'lodash';

import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { groupActionsByWeeks } from '@/utils/utils';

import DateRange from '../common/DateRange';
import SectionTitle from '../common/SectionTitle';
import MemberGeneralStatisticsCards from '../custom/MemberGeneralStatisticsCards';
import ActionsLegend from '../space/charts-layout/ActionsLegend';
import MemberActionsChart from '../space/charts/MemberActionsChart';

const MyStatisticsPage = (): JSX.Element => {
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
    const actionsGroupedByTypes = groupBy(data, 'type');
    return (
      <Box p={2}>
        <Container>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <SectionTitle title={t('MY_STATISTICS')} />
              <DateRange dateRange={dateRange} setDateRange={setDateRange} />
            </Stack>
            {data.length ? (
              <>
                <MemberGeneralStatisticsCards
                  actionsGroupedByTypes={actionsGroupedByTypes}
                />
                <MemberActionsChart
                  actionsGroupedByWeekStart={actionsGroupedByWeekStart}
                />
              </>
            ) : (
              <Typography>{t('NO_RESULTS_FOUND')}</Typography>
            )}
          </Stack>
        </Container>
        <ActionsLegend actionsTypes={Object.keys(actionsGroupedByTypes)} />
      </Box>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return <Alert severity="error">{t('ERROR_FETCHING_DATA')}</Alert>;
};

export default MyStatisticsPage;

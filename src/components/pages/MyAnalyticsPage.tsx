import { useState } from 'react';

import { Alert, Box, Container, Stack, Typography } from '@mui/material';

import { Loader } from '@graasp/ui';

import { addDays, format, formatISO, intervalToDuration } from 'date-fns';
import { groupBy } from 'lodash';

import { useAnalyticsTranslation } from '@/config/i18n';
import { hooks } from '@/config/queryClient';
import { GroupByInterval } from '@/config/type';

import DateRange from '../common/DateRange';
import SectionTitle from '../common/SectionTitle';
import MemberGeneralStatisticsCards from '../custom/MemberGeneralStatisticsCards';
import ActionsLegend from '../space/charts-layout/ActionsLegend';
import MemberActionsChart from '../space/charts/MemberActionsChart';

const MyAnalyticsPage = (): JSX.Element => {
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

  const formattedStartDate = format(dateRange.startDate, 'MMMM d, yyyy');
  const formattedEndDate = format(dateRange.endDate, 'MMMM d, yyyy');

  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  if (data) {
    const actionsGroupedByTypes = groupBy(data, 'type');

    const { months, days } = intervalToDuration({
      start: dateRange.startDate,
      end: dateRange.endDate,
    });

    const groupInterval =
      months && months > 3
        ? GroupByInterval.Month
        : days && days < 8
          ? GroupByInterval.Day
          : GroupByInterval.Week;

    return (
      <Box p={2}>
        <Container>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <SectionTitle title={t('MY_ANALYTICS')} />
              <DateRange dateRange={dateRange} setDateRange={setDateRange} />
            </Stack>
            {data.length ? (
              <>
                <MemberGeneralStatisticsCards
                  actionsGroupedByTypes={actionsGroupedByTypes}
                />
                <MemberActionsChart
                  actions={data}
                  groupInterval={groupInterval}
                />
              </>
            ) : (
              <Typography>
                {t('NO_RESULTS_FOUND', { period: inputValue })}
              </Typography>
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

export default MyAnalyticsPage;

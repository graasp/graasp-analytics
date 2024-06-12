import React from 'react';

import { Typography } from '@mui/material';

import { Action } from '@graasp/sdk';

import { endOfWeek, format } from 'date-fns';
import { countBy, groupBy } from 'lodash';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import ChartContainer from '@/components/common/ChartContainer';
import { getColorForActionTriggerType } from '@/config/constants';
import { useActionsTranslation, useAnalyticsTranslation } from '@/config/i18n';
import { GroupByInterval } from '@/config/type';
import { groupActions } from '@/utils/utils';

type Props = {
  actions: Action[];
  groupInterval: GroupByInterval;
};
const MemberActionsChart = ({ actions, groupInterval }: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { t: translateAction } = useActionsTranslation();

  const types: string[] = Object.keys(groupBy(actions, 'type'));

  const groupedActionsByInterval = groupActions(actions, groupInterval);

  const noOfActionTypesOverInterval = Object.entries(
    groupedActionsByInterval,
  ).map(([dateString, actions]) => {
    const actionsOverIntervalTypeCounts = countBy(actions, 'type');

    // getting chart x-axis title for specified interval
    let title = '';
    const date = new Date(dateString);

    switch (groupInterval) {
      case GroupByInterval.Day:
        title = format(date, 'MMM dd');
        break;
      case GroupByInterval.Month:
        title = format(date, 'MMM yyyy');
        break;
      case GroupByInterval.Week: {
        const endOfTheWeek = endOfWeek(date, {
          weekStartsOn: 1,
        }); // Assuming the week starts on Monday
        title = `${format(date, 'MMM dd')} - ${format(endOfTheWeek, 'MMM dd')}`;
      }
    }

    return {
      date: title,
      ...actionsOverIntervalTypeCounts,
    };
  });

  return (
    <>
      <Typography variant="h5" fontWeight={700}>
        {t('GENERAL_STATISTICS_ACTIVITY_CHART')}
      </Typography>
      <ChartContainer>
        <ComposedChart data={noOfActionTypesOverInterval}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip
            formatter={(value, name: string) => [value, translateAction(name)]}
          />
          <Legend
            formatter={(value) => translateAction(value)}
            align="right"
            layout="vertical"
            wrapperStyle={{ right: '-8px', top: 0 }}
          />

          {types.map((type) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={getColorForActionTriggerType(type)}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default MemberActionsChart;

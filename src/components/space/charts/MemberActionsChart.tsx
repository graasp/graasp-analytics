import React from 'react';

import { Typography } from '@mui/material';

import { Action } from '@graasp/sdk';

import { endOfWeek, format } from 'date-fns';
import { groupBy } from 'lodash';
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

type Props = {
  actionsGroupedByWeekStart: { [key: string]: Action[] };
};
const MemberActionsChart = ({
  actionsGroupedByWeekStart,
}: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { t: translateAction } = useActionsTranslation();

  const types: string[] = [];

  const noOfActionTypesOverWeeks = Object.entries(
    actionsGroupedByWeekStart,
  ).map(([date, actions]) => {
    const actionsByType = groupBy(actions, 'type');
    const typesWithinTheWeek = Object.keys(actionsByType);

    types.push(...typesWithinTheWeek);
    const result = typesWithinTheWeek.reduce(
      (acc: { [key: string]: number }, key) => {
        acc[key] = actionsByType[key].length;
        return acc;
      },
      {},
    );

    const endOfTheWeek = endOfWeek(date as unknown as Date, {
      weekStartsOn: 1,
    }); // Assuming the week starts on Monday

    return {
      date: `${format(date as unknown as Date, 'MMM dd')} - ${format(endOfTheWeek, 'MMM dd')}`,
      ...result,
    };
  });

  const typesSet = new Set(types);

  return (
    <>
      <Typography variant="h5" fontWeight={700}>
        {t('GENERAL_STATISTICS_ACTIVITY_CHART')}
      </Typography>
      <ChartContainer>
        <ComposedChart data={noOfActionTypesOverWeeks}>
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

          {[...typesSet].map((type) => (
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

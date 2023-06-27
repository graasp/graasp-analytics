import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { COLORS, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { filterActionsByActionTypes, findYAxisMax } from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByUserChart = () => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading,
    isError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    type: selectedActions?.value,
    countGroupBy: ['user', 'actionType'],
    aggregateFunction: 'sum',
    aggregateMetric: 'actionCount',
    aggregateBy: ['actionType'],
  });

  if (isLoading || isError) {
    return null;
  }

  const aggregateDataMap = new Map(
    aggregateData
      .toArray()
      .map((d) => [d.actionType, parseInt(d.aggregateResult, 10)]),
  );

  const users = selectedUsers !== null ? [selectedUsers] : allMembers;
  const title = 'Actions by User';
  if (!users) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const userNames = Object.keys(groupBy('name', users));
  const yAxisMax = findYAxisMax(users);

  const groupedActions = groupBy('type', allActions);
  const formattedData = [];
  // for each action type, further group by member id, and then sum the number of actions
  Object.entries(groupedActions).forEach(([key, actionsByType]) => {
    const groupedUsers = groupBy(
      'memberId',
      // add member id to root level
      actionsByType.map((a) => ({ ...a, memberId: a?.member?.id })),
    );
    const userActions = {
      type: key,
      total: aggregateDataMap.get(key),
      others: aggregateDataMap.get(key),
    };
    Object.entries(groupedUsers).forEach((groupedUser) => {
      users.forEach((user) => {
        if (user.id === groupedUser[0]) {
          userActions[user.name] = groupedUser[1].length;
        }
      });
    });
    formattedData.push(userActions);
  });

  formattedData.forEach((userActions) => {
    userNames.forEach((name) => {
      // eslint-disable-next-line no-param-reassign
      userActions.others -= userActions[name] ?? 0;
    });
  });
  userNames.push('others');

  formattedData.sort((a, b) => b.total - a.total);

  if (formattedData.length === 0) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="type" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {userNames.map((name, index) => (
            <Bar
              key=""
              dataKey={name}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ActionsByUserChart;

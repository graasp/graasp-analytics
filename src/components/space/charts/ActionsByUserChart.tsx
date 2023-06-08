import { List } from 'immutable';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { COLORS, DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { groupBy } from '../../../utils/array';
import { filterActionsByActionTypes } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import { ViewDataContext } from '../../context/ViewDataProvider';
import EmptyChart from './EmptyChart';

const ActionsByUserChart = (): JSX.Element => {
  const { t } = useTranslation();
  const { actions, selectedUsers, selectedActionTypes, allMembers } =
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
    type: selectedActionTypes.toJS(),
    countGroupBy: [CountGroupBy.User, CountGroupBy.ActionType],
    aggregateFunction: AggregateFunction.Sum,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.ActionType],
  });

  if (isLoading || isError) {
    return null;
  }
  const aggregateDataMap = new Map(
    aggregateData
      .toArray()
      .map((d) => [d.actionType, parseInt(d.aggregateResult, 10)]),
  );

  const users = selectedUsers?.size ? selectedUsers : allMembers;
  const title = 'Actions by User';
  if (!users) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const userNames = Object.keys(groupBy('name', users));

  // for each action type, further group by member id, and then sum the number of actions
  let groupedActions = Object.entries(groupBy('type', allActions));
  const formattedData = [];

  // filter out non selected action types
  if (selectedActionTypes?.size) {
    groupedActions = groupedActions.filter(([type]) =>
      selectedActionTypes.includes(type),
    );
  }
  groupedActions.forEach(([key, actionsByType]) => {
    const groupedUsers = groupBy(
      'memberId',
      // add member id to root level
      List(actionsByType.map((a) => ({ ...a, memberId: a?.member?.id }))),
    );
    const userActions = {
      type: key,
      total: aggregateDataMap.get(key) ?? 0,
      others: aggregateDataMap.get(key) ?? 0,
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

  if (!formattedData.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="type" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
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

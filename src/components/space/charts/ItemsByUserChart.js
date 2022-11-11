import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../../config/constants';
import {
  filterActionsByActionTypes,
  findItemNameByPath,
  findYAxisMax,
} from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ItemsByUserChart = () => {
  const { t } = useTranslation();
  const {
    actions,
    selectedUsers,
    selectedActions,
    allMembers,
    itemChildren: children,
    itemData,
  } = useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const userNames = Object.keys(groupBy('name', users));
  const yAxisMax = findYAxisMax(users);

  const groupedItems = groupBy('itemPath', allActions);
  const formattedItemsByUser = [];
  Object.entries(groupedItems).forEach((item) => {
    const userActions = {
      name: findItemNameByPath(item[0], children.push(itemData)),
      total: item[1].length,
    };
    const groupedUsers = groupBy('memberId', item[1]);
    Object.entries(groupedUsers).forEach((groupedUser) => {
      users.forEach((user) => {
        if (user.id === groupedUser[0]) {
          userActions[user.name] = groupedUser[1].length;
        }
      });
    });
    formattedItemsByUser.push(userActions);
  });
  formattedItemsByUser.sort((a, b) => b.total - a.total);

  const title = 'Most interacted items';
  if (!formattedItemsByUser.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <ChartContainer>
        <ComposedChart data={formattedItemsByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
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
          <Line
            dataKey="total"
            name={t('Total')}
            type="monotone"
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ItemsByUserChart;

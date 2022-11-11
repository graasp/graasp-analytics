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

const ItemsByActionChart = () => {
  const { t } = useTranslation();
  const {
    actions,
    allMembers,
    selectedUsers,
    selectedActions,
    itemData: item,
    itemChildren: children,
  } = useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = filterActionsByActionTypes(actions, selectedActions);
  const actionTypes = Object.keys(groupBy('actionType', allActions));
  const yAxisMax = findYAxisMax(users);
  const groupedItems = groupBy('itemPath', allActions);

  // const groupedItems = groupBy('itemPath', allActions);
  const formattedItemsByAction = [];
  Object.entries(groupedItems).forEach((groupedItem) => {
    const currentPath = groupedItem[0];
    const userActions = {
      name: findItemNameByPath(currentPath, children.push(item)),
      total: groupedItem[1].length,
    };
    const groupedActions = groupBy('actionType', groupedItem[1]);
    Object.entries(groupedActions).forEach((groupedAction) => {
      userActions[groupedAction[0]] = groupedAction[1].length;
    });
    formattedItemsByAction.push(userActions);
  });
  formattedItemsByAction.sort((a, b) => b.total - a.total);

  const title = 'Items by Action';
  if (!formattedItemsByAction.length) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }
  return (
    <>
      <ChartTitle>{t(title)}</ChartTitle>
      <ChartContainer>
        <ComposedChart data={formattedItemsByAction}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {actionTypes.map((actionType, index) => (
            <Bar
              key=""
              dataKey={actionType}
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

export default ItemsByActionChart;

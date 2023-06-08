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

import {
  COLORS,
  TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
} from '../../../config/constants';
import { groupBy } from '../../../utils/array';
import {
  filterActionsByActionTypes,
  findItemNameByPath,
  groupByFirstLevelItems,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const ItemsByActionChart = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    actions,
    selectedActionTypes,
    itemData: item,
    itemChildren: children,
  } = useContext(DataContext);
  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const types = Object.keys(groupBy('type', allActions));

  const groupedItems = groupByFirstLevelItems(allActions, item);
  const formattedItemsByAction = [];
  Object.entries(groupedItems).forEach((groupedItem) => {
    const currentPath = groupedItem[0];
    const userActions = {
      name: findItemNameByPath(currentPath, (children ?? List()).push(item)),
      total: groupedItem[1].length,
    };
    const groupedActions = groupBy('type', List(groupedItem[1]));
    Object.entries(groupedActions).forEach((groupedAction) => {
      userActions[groupedAction[0]] = groupedAction[1].length;
    });
    formattedItemsByAction.push(userActions);
  });
  formattedItemsByAction.sort((a, b) => b.total - a.total);
  const title = `${TOP_NUMBER_OF_ITEMS_TO_DISPLAY} Most Interacted Items by Action`;
  if (!formattedItemsByAction.length) {
    return <EmptyChart chartTitle={t(title)} />;
  }

  const firstFormattedItmesByUser = formattedItemsByAction.slice(
    0,
    TOP_NUMBER_OF_ITEMS_TO_DISPLAY,
  );
  return (
    <>
      <ChartTitle title={t(title)} />
      <ChartContainer>
        <ComposedChart data={firstFormattedItmesByUser}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis interval={0} dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          {types.map((type, index) => (
            <Bar
              key=""
              dataKey={type}
              stackId="1"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </ComposedChart>
      </ChartContainer>
    </>
  );
};

export default ItemsByActionChart;

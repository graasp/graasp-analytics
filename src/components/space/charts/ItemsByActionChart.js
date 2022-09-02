import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import EmptyChart from './EmptyChart';
import { findYAxisMax } from '../../../utils/api';
import { groupBy } from '../../../utils/array';
import { DataContext } from '../../context/DataProvider';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
  composedChart: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
}));

const ItemsByActionChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, allMembers, selectedUsers, selectedActions } =
    useContext(DataContext);
  const users = selectedUsers.size ? selectedUsers : allMembers;
  const allActions = selectedActions.size ? selectedActions : actions;
  const actionTypes = Object.keys(groupBy('actionType', allActions));
  const yAxisMax = findYAxisMax(users);

  const groupedItems = groupBy('itemPath', allActions);
  const formattedItemsByAction = [];
  Object.entries(groupedItems).forEach((key) => {
    const grouped = groupBy('actionType', key[1]);
    const userActions = {
      name: key[0],
      total: key[1].length,
    };
    Object.entries(grouped).forEach((k) => {
      userActions[k[0]] = k[1].length;
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
      <Typography variant="h6" className={classes.typography}>
        {t(title)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <ComposedChart
          data={formattedItemsByAction}
          className={classes.composedChart}
        >
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
      </ResponsiveContainer>
    </>
  );
};

export default ItemsByActionChart;

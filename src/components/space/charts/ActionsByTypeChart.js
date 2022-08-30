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

const ActionsByTypeChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  const users = selectedUsers.length ? selectedUsers : allMembers;
  const allActions = selectedActions.length ? selectedActions : actions;
  const userIds = Object.keys(groupBy('id', users));
  const yAxisMax = findYAxisMax(users);

  // group all actions by action type
  const groupedActions = groupBy('actionType', allActions);
  const formattedData = [];
  // for each action type, further group by member id, and then sum the number of actions
  Object.entries(groupedActions).forEach((key) => {
    const grouped = groupBy('memberId', key[1]);
    const userActions = {
      name: key[0],
      total: key[1].length,
    };
    Object.entries(grouped).forEach((k) => {
      userActions[k[0]] = k[1].length;
    });
    formattedData.push(userActions);
  });
  formattedData.sort((a, b) => b.total - a.total);

  const title = 'Actions by Action Types';
  if (formattedData.length === 0) {
    return <EmptyChart selectedUsers={selectedUsers} chartTitle={t(title)} />;
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t(title)}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <ComposedChart data={formattedData} className={classes.composedChart}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          {userIds.map((id, index) => (
            <Bar
              key=""
              dataKey={id}
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

export default ActionsByTypeChart;

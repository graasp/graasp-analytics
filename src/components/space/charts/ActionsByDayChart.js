import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getActionsByDay,
  formatActionsByDay,
  filterActionsByUser,
  filterActionsByAction,
  findYAxisMax,
} from '../../../utils/api';
import { CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByDayChart = () => {
  const { t } = useTranslation();
  // const theme = useTheme();
  const classes = useStyles();
  const { actions, selectedUsers, selectedActions, allMembers } =
    useContext(DataContext);
  // actionsByDay is the object passed, after formatting, to the BarChart component below
  // if you remove all names in the react-select dropdown, selectedUsers becomes null
  // if no users are selected (i.e. selectedUsers.length === 0), show all actions
  // if all users are selected (i.e. selectedUsers.length === allMembers.length), also show all actions
  // third condition above is necessary: some actions are made by users NOT in the users list (e.g. user account deleted)
  // e.g. we retrieve 100 total actions and 10 users, but these 10 users have only made 90 actions
  // therefore, to avoid confusion: when all users are selected, show all actions
  const groupBy = (key, arr) =>
    arr.reduce(
      (acc, cur) => ({
        ...acc,
        [cur[key]]: cur[key] in acc ? acc[cur[key]].concat(cur) : [cur],
      }),
      {},
    );
  const actionTypes = Object.keys(groupBy('actionType', actions));
  const noUsers =
    selectedUsers === null ||
    selectedUsers.length === 0 ||
    selectedUsers.length === allMembers.length;
  const noActions =
    selectedActions === null ||
    selectedActions.length === 0 ||
    selectedActions.length === actionTypes.length;
  let actionsByDay;
  if (noUsers && noActions) {
    actionsByDay = getActionsByDay(actions);
    console.log(actionsByDay);
  } else if (!noUsers && noActions) {
    actionsByDay = getActionsByDay(filterActionsByUser(actions, selectedUsers));
  } else if (noUsers && !noActions) {
    actionsByDay = getActionsByDay(
      filterActionsByAction(actions, selectedActions),
    );
  } else {
    const filteredByUser = filterActionsByUser(actions, selectedUsers);
    actionsByDay = getActionsByDay(
      filterActionsByAction(filteredByUser, selectedActions),
    );
  }

  const yAxisMax = findYAxisMax(actionsByDay);
  const formattedActionsByDay = formatActionsByDay(actionsByDay);

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedActionsByDay.length === 0) {
    return (
      <EmptyChart
        selectedUsers={selectedUsers}
        chartTitle={t('Actions by Day')}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Day')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <LineChart
          data={formattedActionsByDay}
          margin={{ top: 30, bottom: 20, left: 20, right: 20 }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="date" tick={{ fontSize: 14 }} />
          <YAxis tick={{ fontSize: 14 }} domain={[0, yAxisMax]} />
          <Tooltip />
          <Line
            dataKey="count"
            name={t('Count')}
            stroke="#8884d8"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ActionsByDayChart;

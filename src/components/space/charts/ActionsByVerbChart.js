import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';
import EmptyChart from './EmptyChart';
import {
  getActionsByVerb,
  formatActionsByVerb,
  filterActionsByUser,
  filterActionsByAction,
} from '../../../utils/api';
import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { DataContext } from '../../context/DataProvider';

const useStyles = makeStyles(() => ({
  typography: { textAlign: 'center' },
}));

const ActionsByVerbChart = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, allMembers, selectedUsers, selectedActions } =
    useContext(DataContext);

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
  let actionsByVerb;
  if (noUsers && noActions) {
    actionsByVerb = getActionsByVerb(actions);
    console.log(actionsByVerb);
  } else if (!noUsers && noActions) {
    actionsByVerb = getActionsByVerb(
      filterActionsByUser(actions, selectedUsers),
    );
  } else if (noUsers && !noActions) {
    actionsByVerb = getActionsByVerb(
      filterActionsByAction(actions, selectedActions),
    );
  } else {
    const filteredByUser = filterActionsByUser(actions, selectedUsers);
    actionsByVerb = getActionsByVerb(
      filterActionsByAction(filteredByUser, selectedActions),
    );
  }
  const formattedActionsByVerb = formatActionsByVerb(actionsByVerb);

  // if selected user(s) have no actions, render component with message that there are no actions
  if (formattedActionsByVerb.length === 0) {
    return (
      <EmptyChart
        selectedUsers={selectedUsers}
        chartTitle={t('Actions by Verb')}
      />
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.typography}>
        {t('Actions by Verb')}
      </Typography>
      <ResponsiveContainer width="95%" height={CONTAINER_HEIGHT}>
        <PieChart fontSize={14}>
          <Pie
            data={formattedActionsByVerb}
            dataKey="percentage"
            nameKey="actionType"
            fill="#82ca9d"
            unit="%"
            label={({ value }) => `${value}%`}
          >
            {formattedActionsByVerb.map((entry, index) => (
              <Cell
                key={entry.actionType}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ActionsByVerbChart;

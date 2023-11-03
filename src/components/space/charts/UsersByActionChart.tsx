import { useContext } from 'react';

import groupBy from 'lodash.groupby';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

import {
  ACTIONS_BY_USER_MAX_DISPLAYED_USERS,
  COLORS,
} from '../../../config/constants';
import {
  filterActionsByActionTypes,
  filterActionsByUsers,
} from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import EmptyChart from './EmptyChart';

const UsersByActionByChart = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedUsers, selectedActionTypes, allMembers } =
    useContext(DataContext);
  const allActions = filterActionsByActionTypes(actions, selectedActionTypes);
  const types = [...new Set(allActions.map((a) => a.type))];

  let formattedUsersByAction: any[] = [];
  const filteredActions = groupBy(
    filterActionsByUsers(allActions, selectedUsers),
    (a) => a.member?.id,
  );
  allMembers.forEach((user) => {
    const groupedActions = groupBy(filteredActions[user.id], (a) => a.type);
    if (Object.values(groupedActions)?.length) {
      const userActions: any = {
        id: user.id,
        name: user.name,
        total: 0,
      };
      for (const [type, list] of Object.entries(groupedActions)) {
        userActions[type] = list.length;
        userActions.total += list.length;
      }
      formattedUsersByAction.push(userActions);
    }
  });
  const maxUsers = ACTIONS_BY_USER_MAX_DISPLAYED_USERS;
  const title = t(`MOST_ACTIVE_USERS`, {
    nb: ACTIONS_BY_USER_MAX_DISPLAYED_USERS,
  });

  // sort by total actions in descending order
  formattedUsersByAction.sort((a, b) => b.total - a.total);
  // get top 10 users
  formattedUsersByAction = formattedUsersByAction.slice(0, maxUsers);
  // filter out users with no actions
  formattedUsersByAction = formattedUsersByAction.filter((user) => user.total);
  if (!formattedUsersByAction.length) {
    return <EmptyChart chartTitle={title} />;
  }

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <ComposedChart data={formattedUsersByAction}>
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
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

export default UsersByActionByChart;

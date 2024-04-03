import { useContext } from 'react';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { useAnalyticsTranslation } from '@/config/i18n';

import { COLORS, CONTAINER_HEIGHT } from '../../../config/constants';
import { filterActions } from '../../../utils/array';
import { formatActionsByVerb, getActionsByVerb } from '../../../utils/utils';
import ChartContainer from '../../common/ChartContainer';
import ChartTitle from '../../common/ChartTitle';
import { DataContext } from '../../context/DataProvider';
import ActionChartLabel from '../charts-layout/ActionChartLabel';
import EmptyChart from './EmptyChart';

const EmptyChartAlert = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: `${CONTAINER_HEIGHT}px`,
});

const ActionsByVerbChart = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const { actions, selectedUsers, selectedActionTypes } =
    useContext(DataContext);

  let actionsByVerb = {};
  if (actions?.length) {
    actionsByVerb = filterActions({
      selectedUsers,
      selectedActionTypes,
      actions,
      chartFunction: getActionsByVerb,
    });
  }
  const formattedActionsByVerb = formatActionsByVerb(actionsByVerb);
  const title = t('ACTIONS_DISTRIBUTIONS');

  // if no user is selected, this chart will be the same as Total Actions Distribution
  // instead show an info text
  if (!selectedUsers?.length) {
    return (
      <>
        <ChartTitle title={t(title)} />
        <EmptyChartAlert>
          <Typography>{t('NO_USER_SELECTED')}</Typography>
        </EmptyChartAlert>
      </>
    );
  }

  // if selected user(s) have no actions, render component with message that there are no actions
  if (!formattedActionsByVerb?.length) {
    return <EmptyChart chartTitle={title} />;
  }

  const formattedActionsByVerbSorted = [...formattedActionsByVerb];
  formattedActionsByVerbSorted.sort((a, b) => a.type.localeCompare(b.type));

  return (
    <>
      <ChartTitle title={title} />
      <ChartContainer>
        <PieChart>
          <Pie
            data={formattedActionsByVerbSorted}
            dataKey="percentage"
            nameKey="type"
            fill="#82ca9d"
            label={ActionChartLabel}
            outerRadius={'78%'}
          >
            {formattedActionsByVerbSorted.map((entry, index) => (
              <Cell key={entry.type} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default ActionsByVerbChart;

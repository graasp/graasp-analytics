import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import FaceIcon from '@mui/icons-material/Face';
import { CardContent, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import {
  AggregateBy,
  AggregateFunction,
  AggregateMetric,
  CountGroupBy,
} from '@graasp/sdk';

import { DEFAULT_REQUEST_SAMPLE_SIZE } from '../../../config/constants';
import { hooks } from '../../../config/queryClient';
import { ViewDataContext } from '../../context/ViewDataProvider';

const CustomRoot = styled(Card)(() => ({
  maxHeight: 150,
  marginBottom: 5,
  textAlign: 'right',
  margin: 20,
}));

const ActiveUsersCard = (): JSX.Element | null => {
  const { t } = useTranslation();
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  // get total users
  const {
    data: totalUsersData,
    isLoading: totalUsersDataIsLoading,
    isError: totalUsersDataIsError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    countGroupBy: [CountGroupBy.User],
    aggregateFunction: AggregateFunction.Count,
    aggregateMetric: AggregateMetric.User,
    aggregateBy: [],
  });

  // get aggregate actions
  const {
    data: aggregateData,
    isLoading: isAggregateDataLoading,
    isError: isAggregateDataError,
  } = hooks.useAggregateActions({
    itemId,
    view,
    requestedSampleSize: DEFAULT_REQUEST_SAMPLE_SIZE,
    countGroupBy: [CountGroupBy.User, CountGroupBy.CreatedDay],
    aggregateFunction: AggregateFunction.Avg,
    aggregateMetric: AggregateMetric.ActionCount,
    aggregateBy: [AggregateBy.CreatedDay],
  });

  if (
    isAggregateDataLoading ||
    isAggregateDataError ||
    totalUsersDataIsLoading ||
    totalUsersDataIsError
  ) {
    return null;
  }

  const totalUsers = totalUsersData.get(0).aggregateResult;

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

  let averageDailyUsersThisMonth = 0;
  let averageDailyUsersThisWeek = 0;
  let usersToday = 0;

  aggregateData.toArray().forEach((o) => {
    const actionTime = o.createdDay.getTime();
    if (actionTime > today) {
      usersToday += parseInt(o.aggregateResult, 10);
    }
    if (actionTime > oneWeekAgo) {
      averageDailyUsersThisWeek += parseInt(o.aggregateResult, 10);
    }
    if (actionTime > oneMonthAgo) {
      averageDailyUsersThisMonth += parseInt(o.aggregateResult, 10);
    }
  });
  averageDailyUsersThisWeek /= 7;
  averageDailyUsersThisMonth /= 30;

  return (
    <>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Total users')}
                <Typography variant="h5" component="div" align="center">
                  {totalUsers}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Average daily users')}
                <br />
                {t('this month')}
                <Typography variant="h5" component="div" align="center">
                  {averageDailyUsersThisMonth.toFixed(3)}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Average daily users')}
                <br />
                {t('this week')}
                <Typography variant="h5" component="div" align="center">
                  {averageDailyUsersThisWeek.toFixed(3)}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
      <CustomRoot variant="outlined">
        <CardContent>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <FaceIcon fontSize="large" />
            </Grid>
            <Grid item xs={9}>
              <Typography component="div" align="center">
                {t('Users today')}
                <Typography variant="h5" component="div" align="center">
                  {usersToday}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CustomRoot>
    </>
  );
};

export default ActiveUsersCard;

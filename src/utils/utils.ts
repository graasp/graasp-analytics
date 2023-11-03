import { Action, DiscriminatedItem, Member } from '@graasp/sdk';

import { Dictionary } from 'cypress/types/lodash';
import capitalize from 'lodash.capitalize';
import countBy from 'lodash.countby';
import groupBy from 'lodash.groupby';
import truncate from 'lodash.truncate';

import {
  ITEM_NAME_MAX_LENGTH,
  MIN_PERCENTAGE_TO_SHOW_VERB,
  OTHER_VERB,
} from '../config/constants';

const getActionDay = (action: Action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const dateObject = action[dateKey];
  // extract only the date information
  const day = new Date(dateObject);
  return day;
};

// Takes array of action objects and returns an object with {key: value} pairs of {date: #-of-actions}
export const getActionsByDay = (
  actions: Action[],
): { [key: string]: number } => {
  const actionsByDayMap = countBy(actions, getActionDay);
  return actionsByDayMap;
};

// Takes object with {key: value} pairs of {date: #-of-actions} and returns a date-sorted array in Recharts.js format
export const formatActionsByDay = (actionsByDayObject: {
  [key: string]: number;
}): { date: string; count: number }[] => {
  const actionsByDayArray: [string, number][] =
    Object.entries(actionsByDayObject);
  const sortedActionsByDay = actionsByDayArray.sort(
    ([d1], [d2]) => Date.parse(d1) - Date.parse(d2),
  );
  return sortedActionsByDay.map(([date, count]) => {
    const entryDate = new Date(date);
    return {
      date: `${entryDate.getDate()}-${
        entryDate.getMonth() + 1
      }-${entryDate.getFullYear()}`,
      count,
    };
  });
};

export const mapActionsToGeoJsonFeatureObjects = (
  actions: Action[],
): {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: number[];
    properties: { cluster: false; actionId: number };
  };
}[] =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  actions
    .filter((action) => action.geolocation)
    .map((action) => {
      const { ll } = action.geolocation as { ll: number[] };
      return {
        type: 'Feature',
        properties: { cluster: false, actionId: action.id },
        geometry: {
          type: 'Point',
          coordinates: [ll[1], ll[0]],
        },
      };
    });

// helper function used in getActionsByTimeOfDay below
const getActionHourOfDay = (action: Action) => {
  const dateKey = 'createdAt';
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const date = new Date(action[dateKey]);
  const hours = date.getUTCHours();
  return hours;
};

// Takes array of action objects and returns an object with {key: value} pairs of {hourOfDay: #-of-actions}
export const getActionsByTimeOfDay = (
  actions: Action[],
): { [key: number]: number } => {
  const actionsByTimeOfDay: { [key: number]: number } = {};
  for (let hours = 0; hours < 24; hours += 1) {
    actionsByTimeOfDay[hours] = 0;
  }
  actions?.forEach((action) => {
    const actionHourOfDay = getActionHourOfDay(action);
    actionsByTimeOfDay[actionHourOfDay] += 1;
  });
  return actionsByTimeOfDay;
};

// Takes object with {key: value} pairs of {timeOfDay: #-of-actions}
// returns a date-sorted array in Recharts.js format
export const formatActionsByTimeOfDay = (actionsByTimeOfDayObject: {
  [key: number]: number;
}): { timeOfDay: number; count: number }[] => {
  const actionsByTimeOfDayArray = Object.entries(actionsByTimeOfDayObject);
  return actionsByTimeOfDayArray.map((entry) => ({
    timeOfDay: parseInt(entry[0], 10),
    count: entry[1],
  }));
};

// helper function used in getActionsByWeekday below
const getActionWeekday = (action: Action) => {
  // createdAt should have the format "2020-12-31T23:59:59.999Z"
  const date = new Date(action.createdAt);
  const weekday = date.getDay();
  return weekday;
};

// Takes array of action objects and returns an object with {key: value} pairs of {weekday: #-of-actions}
export const getActionsByWeekday = (
  actions: Action[],
): { [key: string]: number } => {
  // bug: cannot infer types correctly with Array.from(8).fill(0)
  const actionsByWeekday = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  const updatedActionsByWeekday = countBy(actions, getActionWeekday);
  Object.assign(actionsByWeekday, updatedActionsByWeekday);
  return actionsByWeekday;
};

// Takes object with {key: value} pairs of {weekday: #-of-actions}
// returns an array in Recharts.js format
export const formatActionsByWeekday = (actionsByWeekdayObject: {
  [key: number]: number;
}): { day: string; count: number }[] => {
  const weekdayEnum: {
    [key: string]: string;
  } = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const actionsByWeekdayArray = Object.entries(actionsByWeekdayObject);
  return actionsByWeekdayArray.map(([day, count]) => ({
    day: weekdayEnum[day],
    count,
  }));
};

// Takes array of action objects and returns an object with {key: value} pairs of {verb: %-of-actions}
export const getActionsByVerb = (
  actions: Action[],
): { [key: string]: number } => {
  const totalActions = actions.length;
  const actionsByVerb: { [key: string]: number } = {};
  actions.forEach((action) => {
    if (!actionsByVerb[action.type]) {
      // if type is still not in the actionsByVerb object, add it and assign it to (1 / totalActions)
      // we use (1 / totalActions) because in the end we want this object to be {verb: PERCENTAGE-of-total-actions}
      actionsByVerb[action.type] = 1 / totalActions;
    } else {
      actionsByVerb[action.type] += 1 / totalActions;
    }
  });
  return actionsByVerb;
};

export const formatActionsByVerb = (actionsByVerbObject: {
  [key: string]: number;
}): {
  type: string;
  percentage: number;
}[] => {
  const actionsByVerbArray = Object.entries(actionsByVerbObject);
  // capitalize verbs (entry[0][0]), convert 0.0x notation to x% and round to two decimal places (entry[0][1])
  let formattedActionsByVerbArray: [string, number][] = actionsByVerbArray.map(
    (entry) => [capitalize(entry[0]), parseFloat((entry[1] * 100).toFixed(2))],
  );
  formattedActionsByVerbArray = formattedActionsByVerbArray.filter(
    (entry: [string, number]) => entry[1] >= MIN_PERCENTAGE_TO_SHOW_VERB,
  );

  // add ['other', x%] to cover all verbs that are filtered out of the array
  if (formattedActionsByVerbArray.length) {
    formattedActionsByVerbArray.push([
      OTHER_VERB,
      // ensure that it is a number with two decimal places
      parseFloat(
        (
          100 -
          formattedActionsByVerbArray.reduce(
            (acc, current) => acc + current[1],
            0,
          )
        ).toFixed(2),
      ),
    ]);
  }

  // convert to recharts required format
  return formattedActionsByVerbArray.map((entry) => ({
    type: entry[0],
    percentage: entry[1],
  }));
};

// 'actions' is an array in the format retrieved from the API: [ { id: 1, memberId: 2, ... }, {...} ]
export const filterActionsByUsers = (
  actions: Action[],
  selectedUsers: Member[],
): Action[] => {
  if (!selectedUsers?.length) {
    return actions;
  }
  const selectedUserIds = selectedUsers.map(({ id }) => id);
  return actions.filter(
    (action) =>
      action?.member?.id && selectedUserIds.includes(action.member.id),
  );
};

export const filterActionsByActionTypes = (
  actions: Action[],
  actionsTypes: string[],
): Action[] => {
  // no selection return whole array
  if (!actionsTypes.length) {
    return actions;
  }
  return actions.filter((action) => actionsTypes.includes(action?.type));
};

// given an object key->count, findYAxisMax finds max value to set on the yAxis in the graph in ActionsByDayChart.js
export const findYAxisMax = (actions: {
  [key: string]: number;
}): number | null => {
  const arrayOfActionsCount = Object.values(actions);
  if (!arrayOfActionsCount.length) {
    return null;
  }
  const maxActionsCount = arrayOfActionsCount.reduce((a, b) => Math.max(a, b));
  let yAxisMax;
  // if maxActionsCount <= 100, round up yAxisMax to the nearest ten; else, to the nearest hundred
  if (maxActionsCount <= 100) {
    yAxisMax = Math.ceil(maxActionsCount / 10) * 10;
  } else {
    yAxisMax = Math.ceil(maxActionsCount / 100) * 100;
  }
  return yAxisMax;
};

export const findItemNameByPath = (
  path: string,
  items: DiscriminatedItem[],
): string => {
  const name =
    items?.find(({ path: thisPath }) => path === thisPath)?.name ?? 'Unknown';
  return truncate(name, { length: ITEM_NAME_MAX_LENGTH });
};

// group children of children under the same parent
export const groupByFirstLevelItems = (
  actions: Action[],
  item?: DiscriminatedItem,
): Dictionary<Action[]> => {
  if (!item) {
    return {};
  }

  const nbLevelParent = item.path.split('.').length;

  // compare first level only
  const d = groupBy(
    actions.filter((a) => a.item),
    (a) =>
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      a
        .item!.path.split('.')
        .slice(0, nbLevelParent + 1)
        .join('.'),
  );
  return d;
};

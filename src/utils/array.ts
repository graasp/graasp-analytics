import { List } from 'immutable';

import { ActionRecord, MemberRecord } from '@graasp/sdk/frontend';

import { filterActionsByActionTypes, filterActionsByUsers } from './utils';

export function groupBy<T>(key: string, arr: List<T>): { [key: string]: T[] } {
  return arr.reduce(
    (acc, cur) => ({
      ...acc,
      [cur[key]]: cur[key] in acc ? acc[cur[key]].concat(cur) : [cur],
    }),
    {},
  );
}

export function filterActions<T>({
  selectedUsers,
  selectedActionTypes,
  actions,
  chartFunction,
}: {
  selectedUsers: List<MemberRecord>;
  selectedActionTypes: List<string>;
  actions: List<ActionRecord>;
  chartFunction: (x: any) => T;
}): T {
  const shouldFilterByUser = selectedUsers?.size;
  const shouldFilterByTypes = selectedActionTypes?.size;
  let result;

  if (!shouldFilterByUser && !shouldFilterByTypes) {
    result = chartFunction(actions);
  } else if (shouldFilterByUser && !shouldFilterByTypes) {
    result = chartFunction(filterActionsByUsers(actions, selectedUsers));
  } else if (!shouldFilterByUser && shouldFilterByTypes) {
    result = chartFunction(
      filterActionsByActionTypes(actions, selectedActionTypes),
    );
  } else {
    const filteredByUser = filterActionsByUsers(actions, selectedUsers);
    result = chartFunction(
      filterActionsByActionTypes(filteredByUser, selectedActionTypes),
    );
  }
  return result;
}

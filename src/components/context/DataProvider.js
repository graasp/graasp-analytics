import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Context } from '@graasp/utils';
import { ViewDataContext } from './ViewDataProvider';
import { hooks } from '../../config/queryClient';

export const DataContext = createContext();

// fetch data only if enabled is true
// enabled becomes true only if the user change the view in select
const DataProvider = ({ children }) => {
  const [enabledArray, setEnabledArray] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [actions, setActions] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(false);
  const { view } = useContext(ViewDataContext);
  const { itemId } = useParams();

  const { data: builderData, isError: builderIsError } = hooks.useActions(
    {
      itemId,
      view: Context.BUILDER,
    },
    { enabled: enabledArray[Context.BUILDER] },
  );
  const { data: playerData, isError: playerIsError } = hooks.useActions(
    {
      itemId,
      view: Context.PLAYER,
    },
    { enabled: enabledArray[Context.PLAYER] },
  );
  const { data: explorerData, isError: explorerIsError } = hooks.useActions(
    {
      itemId,
      view: Context.EXPLORER,
    },
    { enabled: enabledArray[Context.EXPLORER] },
  );

  useEffect(() => {
    // fetch corresponding data only when view is shown
    if (!enabledArray[view]) {
      setEnabledArray({ ...enabledArray, [view]: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  useEffect(() => {
    if (
      builderData &&
      view === Context.BUILDER &&
      actions.length !== builderData?.get('actions').length
    ) {
      setActions(builderData?.get('actions'));
      setAllUsers(builderData?.get('users'));
      setError(builderIsError);
    }
  }, [builderData, view, actions, builderIsError]);

  useEffect(() => {
    if (
      playerData &&
      view === Context.PLAYER &&
      actions.length !== playerData?.get('actions').length
    ) {
      setActions(playerData?.get('actions'));
      setAllUsers(playerData?.get('users'));
      setError(playerIsError);
    }
  }, [playerData, view, actions, playerIsError]);

  useEffect(() => {
    if (
      explorerData &&
      view === Context.EXPLORER &&
      actions.length !== explorerData?.get('actions').length
    ) {
      setActions(explorerData?.get('actions'));
      setAllUsers(explorerData?.get('users'));
      setError(explorerIsError);
    }
  }, [explorerData, view, actions, explorerIsError]);

  const value = useMemo(
    () => ({
      actions,
      allUsers,
      selectedUsers,
      setSelectedUsers,
      error,
    }),
    [actions, allUsers, error, selectedUsers],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

DataProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default DataProvider;

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DataContext } from '../../context/DataProvider';
import customStyles from '../../../styles/react-select-styles';
import CustomValueContainer from '../../custom/CustomValueContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    marginRight: theme.spacing(1),
  },
}));

const ActionsSelect = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { actions, selectedActions, setSelectedActions } =
    useContext(DataContext);
  const groupBy = (key, arr) =>
    arr.reduce(
      (acc, cur) => ({
        ...acc,
        [cur[key]]: cur[key] in acc ? acc[cur[key]].concat(cur) : [cur],
      }),
      {},
    );
  const allActions = Object.keys(groupBy('actionType', actions)).map(
    (action) => ({
      name: action,
      value: action,
    }),
  );
  console.log(allActions);
  // custom option allowing us to select all actions in the dropdown
  const allOption = {
    name: t('Select All'),
    value: '*',
  };

  const handleChange = (selectedAction) => {
    setSelectedActions(selectedAction);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typography}>
        {t('Select Actions')}
      </Typography>
      <Select
        styles={customStyles}
        options={[allOption, ...allActions]}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        getOptionValue={(option) => option.name}
        getOptionLabel={(option) => option.name}
        value={selectedActions}
        onChange={(selected) => {
          if (
            selected !== null &&
            selected.length > 0 &&
            selected[selected.length - 1].value === allOption.value
          ) {
            return handleChange(allActions);
          }
          return handleChange(selected);
        }}
        components={{
          ValueContainer: CustomValueContainer,
        }}
      />
    </div>
  );
};

export default ActionsSelect;

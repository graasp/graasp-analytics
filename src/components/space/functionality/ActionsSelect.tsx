import { List } from 'immutable';

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip, FormControl, InputLabel, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { groupBy } from '../../../utils/array';
import { DataContext } from '../../context/DataProvider';

const CustomRoot = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ActionsSelect = (): JSX.Element => {
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const { actions, selectedActionTypes, setSelectedActionTypes } =
    useContext(DataContext);
  if (!actions || !actions.size) {
    return null;
  }
  const allActions = Object.keys(groupBy('type', actions));

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedActionTypes(List(value));
  };
  return (
    <CustomRoot container>
      <FormControl sx={{ m: 1, width: '90%' }}>
        <InputLabel id="demo-multiple-chip-label">
          {t('Action Types')}
        </InputLabel>
        <Select
          label={t('Action Types')}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedActionTypes.toArray()}
          // closeMenuOnSelect
          // hideSelectedOptions={false}
          // getOptionValue={(option) => option.name}
          // getOptionLabel={(option) => option.name}
          // value={selectedActionTypes}
          onChange={handleChange}
          // components={{
          //   ValueContainer: CustomValueContainer,
          // }}
          renderValue={(selected: string[]) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((a) => (
                <Chip key={a} label={a} />
              ))}
            </Box>
          )}
        >
          {allActions.map((a) => (
            <MenuItem key={a} value={a}>
              {a}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </CustomRoot>
  );
};

export default ActionsSelect;

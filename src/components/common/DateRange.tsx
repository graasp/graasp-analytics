import React, { useState } from 'react';
import {
  DateRangePicker,
  Range,
  StaticRange,
  defaultInputRanges,
  defaultStaticRanges,
} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Box, Popover, TextField } from '@mui/material';

import { endOfDay, format, isSameDay, subMonths } from 'date-fns';

import i18n, { locales, useAnalyticsTranslation } from '@/config/i18n';
import { DateRange } from '@/config/type';
import { ANALYTICS } from '@/langs/constants';

const threeMonthsRange = {
  startDate: subMonths(new Date(), 3),
  endDate: endOfDay(new Date()),
};

type Props = {
  dateRange: DateRange;
  setDateRange: (d: DateRange) => void;
};

const DateRangeInput = ({ dateRange, setDateRange }: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedStartDate = format(dateRange.startDate, 'MMM d, yyyy');
  const formattedEndDate = format(dateRange.endDate, 'MMM d, yyyy');
  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  const defaultStaticRangesTranslatedLabels = defaultStaticRanges.map((r) => ({
    ...r,
    label: t(r.label as string),
  }));

  const lastThreeMonths: StaticRange = {
    label: t(ANALYTICS.LAST_THREE_MONTHS_LABEL),
    range: () => threeMonthsRange,
    isSelected(range: Range) {
      return (
        isSameDay(range.startDate as Date, threeMonthsRange.startDate) &&
        isSameDay(range.endDate as Date, threeMonthsRange.endDate)
      );
    },
  };

  return (
    <Box
      margin={{ sm: 'auto', md: 'unset' }}
      maxWidth={{ xs: '100%', sm: '300px' }}
    >
      <TextField
        required
        label={t('RANGE_DATE_PICKER_INPUT_LABEL')}
        value={inputValue}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
        sx={{ width: '100%' }}
      />
      <Popover
        onClose={handleClose}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateRangePicker
          onChange={(item) => setDateRange({ ...dateRange, ...item.selection })}
          maxDate={new Date()}
          ranges={[dateRange]}
          locale={locales[i18n.language]}
          staticRanges={[
            ...defaultStaticRangesTranslatedLabels,
            lastThreeMonths,
          ]}
          inputRanges={[defaultInputRanges[0]]}
        />
      </Popover>
    </Box>
  );
};

export default DateRangeInput;

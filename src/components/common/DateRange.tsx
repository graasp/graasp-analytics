import React, { useState } from 'react';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { Box, Popover, TextField } from '@mui/material';

import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import fr from 'date-fns/locale/fr';

import i18n, { useAnalyticsTranslation } from '@/config/i18n';

// Mapping locales
const locales: {
  [key: string]: Locale;
} = {
  en: enUS,
  fr: fr,
  es: es,
  de: de,
};

type DateRange = { startDate: Date; endDate: Date; key: string };
type Props = {
  dateRange: DateRange;
  setDateRange: (v: DateRange) => void;
};

const DateRange = ({ dateRange, setDateRange }: Props): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formattedStartDate = format(dateRange.startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(dateRange.endDate, 'yyyy-MM-dd');
  const inputValue = `${formattedStartDate} - ${formattedEndDate}`;

  const defaultStaticRangesTranslatedLabels = defaultStaticRanges.map((r) => ({
    ...r,
    label: t(r.label as string),
  }));

  return (
    <Box>
      <TextField
        required
        label={t('RANGE_DATE_PICKER_INPUT_LABEL')}
        value={inputValue}
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
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
          staticRanges={defaultStaticRangesTranslatedLabels}
        />
      </Popover>
    </Box>
  );
};

export default DateRange;

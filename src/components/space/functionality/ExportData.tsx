import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
  styled,
} from '@mui/material';

import { ExportActionsFormatting } from '@graasp/sdk';

import { Braces, Grid3X3 } from 'lucide-react';

import { useAnalyticsTranslation } from '@/config/i18n';

import { mutations } from '../../../config/queryClient';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  '&:before': {
    content: '"•"',
    paddingRight: theme.spacing(1),
    fontSize: theme.typography.body1.fontSize,
  },
}));

const ExportData = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const [format, setFormat] = useState(ExportActionsFormatting.CSV);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isFormatExported, setIsFormatExported] = useState({
    [ExportActionsFormatting.CSV]: false,
    [ExportActionsFormatting.JSON]: false,
  });

  const { mutate: exportActions } = mutations.useExportActions();
  const { itemId } = useParams();

  const icons = {
    [ExportActionsFormatting.CSV]: <Grid3X3 size={16} />,
    [ExportActionsFormatting.JSON]: <Braces size={16} />,
  };
  const onClick = () => {
    if (itemId) {
      exportActions({ itemId, format });
      setIsFormatExported({ ...isFormatExported, [format]: true });
    }
  };

  const handleMenuItemClick = (option: ExportActionsFormatting) => {
    setFormat(option);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const formats = Object.values(ExportActionsFormatting).slice().reverse();
  return (
    <>
      <Typography variant="h6">{t('SELECT_FORMAT_DIALOG_TITLE')}</Typography>
      <Typography variant="body1">
        {t('SELECT_FORMAT_DIALOG_DESCRIPTION')}
      </Typography>
      <List dense sx={{ paddingTop: 0 }}>
        {formats.map((ele) => (
          <CustomListItem key={ele}>
            <ListItemText
              primary={ele}
              secondary={
                <Box display="flex" alignItems="center" gap={0.5}>
                  {icons[ele]}
                  {t(`${ele.toLocaleUpperCase()}_DESCRIPTION`)}
                </Box>
              }
            />
          </CustomListItem>
        ))}
      </List>

      <ButtonGroup variant="contained" ref={anchorRef}>
        <Button onClick={onClick} disabled={isFormatExported[format]}>
          {t('START_EXPORTING', { format: format.toUpperCase() })}
        </Button>
        <Button
          size="small"
          onClick={handleToggle}
          disabled={Object.values(isFormatExported).every(Boolean)}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem>
                  {formats.map((actionFormat) => (
                    <MenuItem
                      key={actionFormat}
                      onClick={() => handleMenuItemClick(actionFormat)}
                      sx={{ display: 'flex', gap: 1 }}
                      disabled={isFormatExported[actionFormat]}
                      selected={actionFormat === format}
                    >
                      {icons[actionFormat]} {actionFormat}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default ExportData;

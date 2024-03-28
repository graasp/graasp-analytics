import React, { useContext, useState } from 'react';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
  styled,
} from '@mui/material';

import { DataContext } from '@/components/context/DataProvider';
import { COLORS } from '@/config/constants';
import { useAnalyticsTranslation } from '@/config/i18n';

const actionsDescriptionTransKeys: { [key: string]: string } = {
  'item-view': 'ITEM_VIEW_ACTION_DESCRIPTION',
  copy: 'COPY_ACTION_DESCRIPTION',
  update: 'UPDATE_ACTION_DESCRIPTION',
  'item-download': 'ITEM_DOWNLOAD_ACTION_DESCRIPTION',
  create: 'CREATE_ACTION_DESCRIPTION',
  move: 'MOVE_ACTION_DESCRIPTION',
};

const StyledFab = styled(Fab)(({ theme }) => ({
  flexGrow: 1,
  flexShrink: 0,
  width: theme.spacing(3),
  height: theme.spacing(3),
  minHeight: theme.spacing(3),
}));

const StyledItemAvatar = styled(ListItemAvatar)<{ background: string }>(
  ({ theme, background }) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    minWidth: theme.spacing(3),
    background,
  }),
);

const ActionsLegend = (): JSX.Element => {
  const { actions } = useContext(DataContext);
  const { t } = useAnalyticsTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const types = [...new Set(actions.map((a) => a.type))];

  return (
    <>
      <StyledFab
        color="primary"
        aria-label="actions-legend"
        onClick={handleClick}
      >
        <QuestionMarkIcon fontSize="small" />
      </StyledFab>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ width: '400px', padding: 3 }}>
          <Typography>{t('ACTIONS_LEGEND_MODAL_TITLE')}</Typography>
          <List sx={{ maxHeight: '50vh', overflow: 'auto' }}>
            {types.map((ele, index) => (
              <ListItem key={ele} sx={{ gap: 1, p: 0 }}>
                <StyledItemAvatar background={COLORS[index]} />
                <ListItemText
                  primary={<Typography variant="body2">{ele}</Typography>}
                  secondary={
                    <Typography color="gray" variant="caption">
                      {t(actionsDescriptionTransKeys[ele])}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default ActionsLegend;

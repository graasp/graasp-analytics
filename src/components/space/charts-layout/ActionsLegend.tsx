import React, { useContext, useState } from 'react';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  List,
  ListItem,
  ListItemText,
  Tooltip,
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
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(8),
}));

const ActionColorBox = styled(Box)<{ background: string }>(
  ({ theme, background }) => ({
    width: theme.spacing(2),
    height: theme.spacing(2),
    minWidth: theme.spacing(2),
    borderRadius: theme.spacing(0.5),
    background,
  }),
);

const ActionsLegend = (): JSX.Element => {
  const { actions } = useContext(DataContext);
  const { t } = useAnalyticsTranslation();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const types = [...new Set(actions.map((a) => a.type))];

  return (
    <>
      <Tooltip title={t('ACTIONS_LEGEND_MODAL_TITLE')} placement="left">
        <StyledFab
          color="primary"
          aria-label="actions-legend"
          onClick={() => setOpen(true)}
          size="large"
        >
          <QuestionMarkIcon />
        </StyledFab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ paddingBottom: 0 }}>
          {t('ACTIONS_LEGEND_MODAL_TITLE')}
        </DialogTitle>
        <DialogContent sx={{ maxWidth: '400px' }}>
          <List sx={{ maxHeight: '50vh' }}>
            {types.map((ele, index) => (
              <ListItem key={ele} sx={{ p: 0, marginBottom: 1 }}>
                <ListItemText
                  primary={
                    <Box display="flex" gap={1} alignItems="center">
                      <ActionColorBox background={COLORS[index]} />
                      <Typography variant="body2" lineHeight={2}>
                        {ele}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      color="gray"
                      variant="caption"
                      lineHeight={1.5}
                      display="block"
                    >
                      {t(actionsDescriptionTransKeys[ele])}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionsLegend;

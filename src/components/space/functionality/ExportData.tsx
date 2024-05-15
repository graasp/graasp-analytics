import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material';

import { ExportActionsFormatting } from '@graasp/sdk';
import { Button } from '@graasp/ui';

import { useAnalyticsTranslation } from '@/config/i18n';

import { mutations } from '../../../config/queryClient';

const ExportData = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState(ExportActionsFormatting.JSON);

  const { mutate: exportActions, isLoading } = mutations.useExportActions();
  const { itemId } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    handleClose();
    if (itemId) {
      exportActions({ itemId, format });
    }
  };

  return (
    <>
      <Tooltip title={t('EXPORT_TOOLTIP')} placement="right" arrow>
        <Button onClick={handleClickOpen} variant="contained" size="large">
          {t('EXPORT_ITEM')}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('SELECT_FORMAT_DIALOG_TITLE')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('SELECT_FORMAT_DIALOG_DESCRIPTION')}
          </DialogContentText>

          <FormControl>
            <RadioGroup
              name="exportFormat"
              value={format}
              onChange={(event) => {
                setFormat(event.target.value as ExportActionsFormatting);
              }}
            >
              <FormControlLabel
                value={ExportActionsFormatting.JSON}
                control={<Radio />}
                label={ExportActionsFormatting.JSON}
              />
              <FormControlLabel
                value={ExportActionsFormatting.CSV}
                control={<Radio />}
                label={ExportActionsFormatting.CSV}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            {t('CANCEL_SELECT_FORMAT_DIALOG')}
          </Button>
          <LoadingButton
            onClick={onClick}
            variant="contained"
            endIcon={<CloudDownloadIcon />}
            loading={isLoading}
          >
            {t('EXPORT_ITEM_DATASET')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExportData;

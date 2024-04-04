import React from 'react';

import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import SectionTitle from '@/components/common/SectionTitle';
import ExportData from '@/components/space/functionality/ExportData';
import { useAnalyticsTranslation } from '@/config/i18n';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  '&:before': {
    content: '"•"', // Using bullet unicode as an example; you might want to find a circle unicode or use an SVG/background.
    color: theme.palette.text.primary, // Adjust color to match your theme or preference
    paddingRight: theme.spacing(1), // Adjust spacing as needed
    fontSize: theme.typography.body1.fontSize, // Ensure the pseudo-element matches the font size of the list item text; adjust as necessary.
    // Vertical alignment can be tricky; adjust as needed based on your design.
    lineHeight: '24px', // Adjust based on the actual height of your list items.
  },
}));

const ExportAnalyticsPage = (): JSX.Element => {
  const { t } = useAnalyticsTranslation();

  return (
    <Container>
      <Stack paddingY={2} spacing={2} alignItems="center">
        <SectionTitle title={t('EXPORT_ANALYTICS_TITLE')} />
        <Typography variant="body1" whiteSpace="pre-line">
          {t('EXPORT_ANALYTICS_DESCRIPTION')}
        </Typography>
        <Stack
          // direction="row"
          // alignItems="center"
          // justifyContent="space-around"
          width="100%"
          // gap={5}
        >
          <Box alignSelf={'self-start'}>
            <Typography variant="h6">What about to export?</Typography>
            <List dense>
              <CustomListItem sx={{ listStyle: 'circle' }}>
                <ListItemText
                  primary="Tracked actions within different view"
                  secondary={'Library, Player, Account, and Analytics'}
                />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Descendants" />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Item" />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Members and memberships" />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Chat" />
              </CustomListItem>
              <CustomListItem>
                <ListItemText primary="Apps" />
              </CustomListItem>
            </List>
          </Box>
          <Box>
            <ExportData />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ExportAnalyticsPage;

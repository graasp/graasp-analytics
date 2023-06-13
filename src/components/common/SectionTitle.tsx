import InfoIcon from '@mui/icons-material/Info';
import { Grid, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';

const SectionTitle = ({
  title,
  description = title,
}: {
  title: string;
  description: string;
}): JSX.Element => (
  <Grid container spacing={2} p={2} alignItems="center" justifyContent="center">
    <Grid item>
      <Typography variant="h3" align="center" fontWeight={900} color="#8C8C8C">
        {title}
      </Typography>
    </Grid>
    <Grid item>
      <Tooltip title={description}>
        <InfoIcon color="action" />
      </Tooltip>
    </Grid>
  </Grid>
);

export default SectionTitle;

import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

const SectionTitle = ({
  title,
  icons,
}: {
  title: string;
  icons?: JSX.Element[];
}): JSX.Element => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    spacing={2}
  >
    <Typography variant="h3" align="center" fontWeight={900} color="#8C8C8C">
      {title}
    </Typography>
    {icons}
  </Stack>
);

export default SectionTitle;

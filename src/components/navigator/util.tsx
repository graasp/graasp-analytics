import truncate from 'lodash.truncate';

import { Link } from 'react-router-dom';

import { Typography, styled } from '@mui/material';

import { ITEM_NAME_MAX_LENGTH } from '../../config/constants';
import { buildItemPath } from '../../config/paths';

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: '#000000',
});

type ParentLinkProps = {
  id: string;
  name: string;
};

const ParentLink = ({ id, name }: ParentLinkProps) => (
  <StyledLink to={buildItemPath(id)}>
    <Typography>{truncate(name, { length: ITEM_NAME_MAX_LENGTH })}</Typography>
  </StyledLink>
);

export { ParentLink, StyledLink };

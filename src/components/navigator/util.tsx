import truncate from 'lodash.truncate';

import { Link } from 'react-router-dom';

import { Typography, styled } from '@mui/material';

import { ITEM_NAME_MAX_LENGTH } from '../../config/constants';
import { buildItemPath } from '../../config/paths';

const getParentsIdsFromPath = (
  path: string,
  { ignoreSelf = false } = {},
): string[] => {
  if (!path) {
    return [];
  }

  let p = path;
  // ignore self item in path
  if (ignoreSelf) {
    // split path in half parents / self
    // eslint-disable-next-line no-useless-escape
    const els = path.split(/\.[^\.]*$/);
    // if els has only one element, the item has no parent
    if (els.length <= 1) {
      return [];
    }
    [p] = els;
  }
  const ids = p.replace(/_/g, '-').split('.');
  return ids;
};

const StyledLink = styled(Link)({
  textDecoration: 'none',
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

export { getParentsIdsFromPath, ParentLink, StyledLink };

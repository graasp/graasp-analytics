import truncate from 'lodash.truncate';

import { useLocation, useMatch } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import { ITEM_NAME_MAX_LENGTH } from '../../config/constants';
import {
  HOME_PATH,
  SHARED_ITEMS_PATH,
  buildItemPath,
} from '../../config/paths';
import { hooks } from '../../config/queryClient';
import { HomeMenu, ItemMenu, RootMenu } from './Menu';
import { ParentLink, StyledLink } from './util';

const { useItem, useParents, useCurrentMember } = hooks;

const CenterAlignWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledHomeIcon = styled(HomeIcon)({
  padding: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Navigator = () => {
  const match = useMatch(buildItemPath());
  const { pathname } = useLocation();
  const itemId = match?.params?.itemId;
  const { data: currentMember } = useCurrentMember();
  const currentMemberId = currentMember?.id;
  const { data: item, isLoading: isItemLoading } = useItem(itemId);
  const itemPath = item?.path;

  const { data: parents, isLoading: parentIsLoading } = useParents({
    id: itemId,
    path: itemPath,
    enabled: !!itemPath,
  });

  if (isItemLoading) {
    return null;
  }

  if (parentIsLoading) {
    return null;
  }

  const renderRoot = () => {
    let to = HOME_PATH;
    let text = 'My items';
    let isShared = false;

    const isParentOwned =
      (item?.creator ?? parents?.first()?.creator) === currentMemberId;

    if (
      pathname === SHARED_ITEMS_PATH ||
      (pathname !== HOME_PATH && !isParentOwned)
    ) {
      to = SHARED_ITEMS_PATH;
      text = 'Shared items';
      isShared = true;
    }

    return (
      <CenterAlignWrapper>
        <StyledLink color="inherit" to={to}>
          <Typography>{text}</Typography>
        </StyledLink>
        <RootMenu isShared={isShared} />
      </CenterAlignWrapper>
    );
  };

  const renderParents = () =>
    parents?.map(({ name, id }) => (
      <CenterAlignWrapper key={id}>
        <ParentLink name={name} id={id} />
        <ItemMenu itemId={id} />
      </CenterAlignWrapper>
    ));

  const renderHome = () => (
    <CenterAlignWrapper>
      <StyledLink to="#">
        <StyledHomeIcon />
      </StyledLink>
      <HomeMenu />
    </CenterAlignWrapper>
  );

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon />}
      aria-label="breadcrumb"
      style={{ backgroundColor: '#f6f6f6' }}
    >
      {renderHome()}
      {renderRoot()}
      {itemId && renderParents()}
      {itemId && (
        <CenterAlignWrapper>
          <StyledLink key={itemId} to={buildItemPath(itemId)}>
            <Typography>
              {truncate(item.name, { length: ITEM_NAME_MAX_LENGTH })}
            </Typography>
          </StyledLink>
          <ItemMenu itemId={itemId} />
        </CenterAlignWrapper>
      )}
    </Breadcrumbs>
  );
};

export default Navigator;

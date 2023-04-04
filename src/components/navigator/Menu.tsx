import React from 'react';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton, Menu, MenuItem, Typography, styled } from '@mui/material';

import { buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';

const { useChildren, useOwnItems, useSharedItems } = hooks;

const StyledIconButton = styled(IconButton)({
  margin: 0,
});

const HomeMenu = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-controls={open ? `menu-home` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-home"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/">
          <Typography>My items</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/shared">
          <Typography>Shared items</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

const RootMenu = ({ isShared }: { isShared: boolean }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: item, isLoading: isItemLoading } = isShared
    ? useSharedItems()
    : useOwnItems();

  if (isItemLoading) {
    return null;
  }

  if (!item || item.size === 0) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-controls={open ? 'menu-root' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id="menu-root"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {item?.map(({ name, id }) => (
          <MenuItem key={id} component={Link} to={buildItemPath(id)}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const ItemMenu = ({ itemId }: { itemId: string }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: item, isLoading: isItemLoading } = useChildren(itemId);

  if (isItemLoading) {
    return null;
  }

  if (!item || item.size === 0) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-controls={open ? `menu-${itemId}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id={`menu-${itemId}`}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {item?.map(({ name, id }) => (
          <MenuItem key={id} component={Link} to={buildItemPath(id)}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export { RootMenu, ItemMenu, HomeMenu };

import React from 'react';
import { Link } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Typography } from '@mui/material';

import { buildItemPath } from '../../config/paths';
import { hooks } from '../../config/queryClient';
import {
  buildMenu,
  buildMenuDropdownButton,
  buildMenuItem,
} from '../../config/selectors';
import { StyledIconButton } from './util';

const { useChildren } = hooks;

const ItemMenu = ({ itemId }: { itemId: string }): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data: items, isLoading: areItemsLoading } = useChildren(itemId);

  if (areItemsLoading) {
    return null;
  }

  if (!items || items.size === 0) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        id={buildMenuDropdownButton(itemId)}
        onClick={handleClick}
        aria-controls={open ? buildMenu(itemId) : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <ArrowDropDownIcon />
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id={buildMenu(itemId)}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {items?.map(({ name, id }) => (
          <MenuItem
            id={buildMenuItem(id, itemId)}
            key={id}
            component={Link}
            to={buildItemPath(id)}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ItemMenu;
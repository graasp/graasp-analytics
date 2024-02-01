import { Link, useParams } from 'react-router-dom';

import { Box, styled } from '@mui/material';

import { Context } from '@graasp/sdk';
import {
  Main,
  Platform,
  PlatformSwitch,
  defaultHostsMapper,
  usePlatformNavigation,
} from '@graasp/ui';

import { HOST_MAP } from '@/config/constants';
import { HOME_PATH } from '@/config/paths';

import UserSwitchWrapper from '../common/UserSwitchWrapper';
import Footer from './Footer';
import Navigator from './Navigator';
import Sidebar from './Sidebar';

export const platformsHostsMap = defaultHostsMapper({
  [Platform.Builder]: HOST_MAP[Context.Builder],
  [Platform.Player]: HOST_MAP[Context.Player],
  [Platform.Library]: HOST_MAP[Context.Library],
});

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
}));
const LinkComponent = ({ children }: { children: JSX.Element }) => (
  <StyledLink to={HOME_PATH}>{children}</StyledLink>
);

const PageWrapper = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { itemId } = useParams();
  const getNavigationEvents = usePlatformNavigation(platformsHostsMap, itemId);

  const platformProps = {
    [Platform.Builder]: {
      ...getNavigationEvents(Platform.Builder),
    },
    [Platform.Player]: {
      ...getNavigationEvents(Platform.Player),
    },
    [Platform.Library]: {
      ...getNavigationEvents(Platform.Library),
    },
    [Platform.Analytics]: {
      ...getNavigationEvents(Platform.Analytics),
    },
  };
  return (
    <Main
      context={Context.Analytics}
      drawerContent={<Sidebar />}
      drawerOpenAriaLabel={''}
      headerRightContent={<UserSwitchWrapper />}
      PlatformComponent={
        <PlatformSwitch
          selected={Platform.Analytics}
          platformsProps={platformProps}
          disabledColor="#999"
        />
      }
      LinkComponent={LinkComponent}
    >
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="space-between"
        flexDirection="column"
      >
        <Box id="navigatorContainer" width="100%">
          <Navigator />
        </Box>
        {children}
        <Footer />
      </Box>
    </Main>
  );
};
export default PageWrapper;

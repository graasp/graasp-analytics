import { DOMAIN } from '@/config/env';

import { COOKIE_KEYS } from '@graasp/sdk';
import { CookiesBanner } from '@graasp/ui';

const Component = (): JSX.Element => (
  // todo: translate when using global translator
  <CookiesBanner cookieName={COOKIE_KEYS.ACCEPT_COOKIES_KEY} domain={DOMAIN} />
);
export default Component;

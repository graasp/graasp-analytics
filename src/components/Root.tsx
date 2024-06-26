import ReactGA from 'react-ga4';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { hasAcceptedCookies } from '@graasp/sdk';
import { theme } from '@graasp/ui';

import { GA_MEASUREMENT_ID } from '../config/env';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import App from './App';

if (GA_MEASUREMENT_ID && hasAcceptedCookies() && import.meta.env.PROD) {
  ReactGA.initialize(GA_MEASUREMENT_ID);
  ReactGA.send('pageview');
}

const Root = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nextProvider i18n={i18nConfig}>
        <Router>
          <App />
        </Router>
        <ToastContainer stacked />
      </I18nextProvider>
    </ThemeProvider>
    {import.meta.env.DEV && import.meta.env.MODE !== 'test' && (
      <ReactQueryDevtools />
    )}
  </QueryClientProvider>
);

export default Root;

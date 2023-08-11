import ReactGa from 'react-ga';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider, styled } from '@mui/material';

import { theme } from '@graasp/ui';

import { NODE_ENV, REACT_APP_GOOGLE_ANALYTICS_ID } from '../config/env';
import i18nConfig from '../config/i18n';
import {
  QueryClientProvider,
  ReactQueryDevtools,
  queryClient,
} from '../config/queryClient';
import App from './App';

if (REACT_APP_GOOGLE_ANALYTICS_ID) {
  ReactGa.initialize(REACT_APP_GOOGLE_ANALYTICS_ID);
}

const CustomRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Root = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CustomRoot>
        <I18nextProvider i18n={i18nConfig}>
          <App />
          <ToastContainer />
        </I18nextProvider>
      </CustomRoot>
    </ThemeProvider>
    {NODE_ENV === 'development' && <ReactQueryDevtools />}
  </QueryClientProvider>
);

export default Root;
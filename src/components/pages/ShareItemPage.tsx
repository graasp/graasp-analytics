import QueryStatsIcon from '@mui/icons-material/QueryStats';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../navigator/Navigator';

const ShareItemPage = (): JSX.Element => (
  <>
    <Header />
    <Navigator />
    <main
      style={{
        flex: 1,
        textAlign: 'center',
        padding: '100px',
      }}
    >
      <QueryStatsIcon fontSize="large" />
      <h1>Please select a shared item from the navigator</h1>
      <h1>to view the analytics.</h1>
    </main>
    <Footer />
  </>
);

export default ShareItemPage;

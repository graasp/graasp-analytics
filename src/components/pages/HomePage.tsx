import QueryStatsIcon from '@mui/icons-material/QueryStats';

import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../navigator/Navigator';

const HomePage = (): JSX.Element => (
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
      <h1>Please select an item from the navigator to view the analytics.</h1>
    </main>
    <Footer />
  </>
);

export default HomePage;

import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ContextsWrapper from '../context/ContextsWrapper';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Navigator from '../navigator/Navigator';
import Sidebar from '../sidebar/Sidebar';
import ChartsLayout from '../space/ChartsLayout';

const ItemPage = ({ isEmbeded }: { isEmbeded: boolean }) => {
  const theme = useTheme();
  if (isEmbeded) {
    return (
      <main style={{ paddingTop: theme.spacing(2) }}>
        <ContextsWrapper>
          <ChartsLayout />
        </ContextsWrapper>
      </main>
    );
  }
  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <Navigator />
        <Grid container spacing={2}>
          <Grid item xs={1.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={10.5}>
            <ContextsWrapper>
              <ChartsLayout />
            </ContextsWrapper>
            <div id="general">General</div>
            <div id="contents">Contents</div>
            <div id="actions">Actions</div>
            <div id="chats">Chats</div>
            <div id="apps">Apps</div>
          </Grid>
        </Grid>
      </main>
      <Footer />
    </>
  );
};

export default ItemPage;

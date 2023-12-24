// project import
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import Router from 'routes/Router';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Router />
    </ScrollTop>
  </ThemeCustomization>
);

export default App;

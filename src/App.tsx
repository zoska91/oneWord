import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GlobalStyle from 'styles/GlobalStyle';
import { theme } from 'styles/theme';
import { routes } from 'routes';
import HomePage from 'pages/HomePage';
import UserPage from 'pages/UserPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.user} component={UserPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

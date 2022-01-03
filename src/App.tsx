import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';

import GlobalStyle from 'styles/GlobalStyle';
import { theme } from 'styles/theme';
import { routes } from 'routes';
import HomePage from 'pages/Home/HomePage';
import UserPage from 'pages/User/UserPage';
// import { getUserSettingsAPI } from 'db/API/settings';

function App() {
  return (
    <ChakraProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <button onClick={getUserSettingsAPI}>get user</button> */}
        <Router>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route exact path={routes.user} component={UserPage} />
          </Switch>
        </Router>
        <ToastContainer />
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;

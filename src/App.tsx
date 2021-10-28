import Background from './components/Background';
import Card from './components/Card';
import SignIn from './components/SignUp';

import GlobalStyle from 'styles/GlobalStyle';

function App() {
  return (
    <div className='App'>
      <GlobalStyle />
      <Background />
      <Card />
      <SignIn />
    </div>
  );
}

export default App;

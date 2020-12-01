import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import NavBar from './components/Navbar';
import AuthRoute from './utils/AuthRoute';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

const theme = createMuiTheme(themeFile);
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute
                exact
                path='/login'
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path='/signup'
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

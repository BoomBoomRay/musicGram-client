import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../utils/MyButton';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import Notifications from '@material-ui/icons/Notifications';

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <ToolBar className='nav-bar-container'>
        {authenticated ? (
          <>
            <MyButton tip='Post'>
              <AddIcon color='secondary' />
            </MyButton>
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon color='secondary' />
              </MyButton>
            </Link>
            <MyButton tip='Notifications'>
              <Notifications color='secondary' />
            </MyButton>
          </>
        ) : (
          <>
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
            <Button color='inherit' component={Link} to='/'>
              Home
            </Button>
            <Button color='inherit' component={Link} to='/signup'>
              Sign up
            </Button>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);

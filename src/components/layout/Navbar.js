import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MyButton from '../../utils/MyButton';
import PostAPost from '../post/PostAPost';
import Notifications from './Notifications';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <ToolBar className='nav-bar-container'>
        {authenticated ? (
          <>
            <PostAPost />
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon color='secondary' />
              </MyButton>
            </Link>
            <Notifications />
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

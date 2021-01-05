import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayJs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../utils/MyButton';
import ProfileSkeleton from '../../utils/ProfileSkeleton';

// Material Ui
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import { Paper, Typography, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
// Redux
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../../redux/actions/userActions';

const styles = (theme) => ({ ...theme.profile });

const Profile = ({ classes, logoutUser, uploadImage, ...props }) => {
  const {
    loading,
    authenticated,
    credentials: { email, handle, createdAt, imageUrl, bio, website, location },
  } = props.user;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    uploadImage(formData);
  };

  const handleEditImage = (e) => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const handleLogout = () => {
    logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            <img src={imageUrl} alt='profile' className='profile-image' />
            <input
              type='file'
              hidden='hidden'
              id='imageInput'
              onChange={handleImageChange}
            />
            <MyButton
              tip='Edit profile Picture'
              onClick={handleEditImage}
              btnClassName='button'
            >
              <EditIcon color='primary' />
            </MyButton>
          </div>
          <div className='profile-details'>
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color='primary'
              variant='h5'
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant='body2'>{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color='primary' /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color='primary' />
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  {' '}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color='primary' />{' '}
            <span> Joined {dayJs(createdAt).format('MMM YYYY')}</span>
          </div>
          <MyButton tip='Logout' onClick={handleLogout} btnClassName='button'>
            <KeyboardReturn color='primary' />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant='body2' align='center'>
          No Profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/login'
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/signup'
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );

  return profileMarkup;
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile));

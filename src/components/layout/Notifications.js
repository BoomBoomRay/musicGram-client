import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';
import { withStyles } from '@material-ui/core';

const styles = (theme) => ({
  fuck: {
    color: ' white !important',
    backgroundColor: 'red',
  },
});
export const Notifications = ({
  markNotificationsRead,
  notifications,
  classes,
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuOpened = () => {
    let unReadNotificationsIds = notifications
      .filter((noti) => !noti.read)
      .map((noti) => noti.notificationId);
    markNotificationsRead(unReadNotificationsIds);
  };

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((noti) => noti.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((noti) => noti.read === false).length
            }
            color='error'
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }
  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((noti) => {
        const verb = noti.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(noti.createdAt).fromNow();
        const iconColor = noti.read ? 'primary' : 'error';
        const icon =
          noti.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem onClick={handleClose} key={noti.createdAt}>
            {icon}
            <Typography
              component={Link}
              color='textSecondary'
              variant='body1'
              to={`/users/${noti.recipient}/post/${noti.postId}`}
            >
              {noti.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
    );
  return (
    <>
      <Tooltip placement='top' title='Notifications'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
        style={{ top: '-10px' }}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapActionToProps = { markNotificationsRead };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Notifications));

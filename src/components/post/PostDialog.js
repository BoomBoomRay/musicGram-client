import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

// Redux
import { connect, useDispatch } from 'react-redux';
import { getPost } from '../../redux/actions/dataActions';

//Material UI
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import { UnfoldMore } from '@material-ui/icons';
import ChatIcon from '@material-ui/icons/Chat';

const style = (theme) => ({
  ...theme.form,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover',
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
  },
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});

export const PostDialog = ({
  classes,
  getPost,
  postId,
  UI,
  post,
  userHandleProp,
  likeCount,
  openDialog,
}) => {
  const [state, setState] = useState({ open: false, oldPath: '', newPath: '' });
  const dispatch = useDispatch();
  const { loading } = UI;
  const {
    body,
    createdAt,
    commentCount,
    userImage,
    userHandle,
    comments,
  } = post.postData ? post.postData : '';

  useEffect(() => {
    if (openDialog) handleOpen();
  }, []);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${userHandleProp}/post/${postId}`;
    const { open } = state;
    if (oldPath === newPath) oldPath = `/users/${userHandleProp}`;
    window.history.pushState(null, null, newPath);
    setState((prevState) => ({
      ...prevState,
      open: !open,
      oldPath,
      newPath,
    }));
    getPost(postId);
  };

  const handleClose = () => {
    const { oldPath } = state;
    window.history.pushState(null, null, oldPath);
    setState({ open: false });
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1'>{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} likes</span>
        <MyButton tip='comments'>
          <ChatIcon color='primary' />
        </MyButton>
        <span>{commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );

  const { open } = state;
  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip='Expand Post'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandleProp: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(PostDialog));

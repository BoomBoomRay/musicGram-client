import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../utils/MyButton';
import DeleteBtn from './DeleteBtn';
import PostDialog from './PostDialog';
import LikeButton from './LikeButton';

// Material UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

const Post = ({ post, classes, user }) => {
  const { authenticated, credentials } = user;
  const {
    userImage,
    userHandle,
    createdAt,
    body,
    postId,
    likeCount,
    commentCount,
  } = post;
  dayjs.extend(relativeTime);

  const newImage =
    credentials.handle === post.userHandle ? credentials.imageUrl : userImage;

  const deleteButton =
    authenticated && credentials.handle === userHandle ? (
      <DeleteBtn postId={post.postId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <>
        <CardMedia
          className={classes.image}
          image={newImage}
          title='Profile image'
        ></CardMedia>
        <CardContent className={classes.content}>
          <Typography
            variant='h5'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant='body2' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip='comments'>
            <ChatIcon color='primary' />
          </MyButton>
          <span>{commentCount} comments</span>
          <PostDialog
            likeCount={likeCount}
            postId={postId}
            userHandle={userHandle}
          />
        </CardContent>
      </>
    </Card>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Post));

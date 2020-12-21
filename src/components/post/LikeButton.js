import React from 'react';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

export const LikeButton = ({ user, likePost, unlikePost, postId }) => {
  const { authenticated } = user;

  const checkLikedPost = () => {
    if (user.likes && user.likes.find((like) => like.postId === postId))
      return true;
    else return false;
  };

  const likeAPost = () => {
    likePost(postId);
  };

  const unLikeAPost = () => {
    unlikePost(postId);
  };

  const likeButton = !authenticated ? (
    <MyButton tip='Like'>
      <Link to='/login'>
        <FavoriteBorder color='primary' />
      </Link>
    </MyButton>
  ) : checkLikedPost() ? (
    <MyButton tip='Undo like' onClick={unLikeAPost}>
      <FavoriteIcon color='primary' />
    </MyButton>
  ) : (
    <MyButton tip='Like' onClick={likeAPost}>
      <FavoriteBorder color='primary' />
    </MyButton>
  );

  return <>{likeButton}</>;
};
LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapActionToProps)(LikeButton);

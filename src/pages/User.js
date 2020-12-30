import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile.js';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

export const User = ({ getUserData, data, ...props }) => {
  const [state, setState] = useState({ postIdParam: '' });
  const userProfile = data.posts.user;

  const checkParams = () => {
    const postId = props.match.params.postId;
    if (postId)
      setState((prevState) => ({ ...prevState, postIdParam: postId }));
    else return null;
  };

  useEffect(() => {
    const handle = props.match.params.handle;
    checkParams();
    getUserData(handle);
  }, [getUserData, props.match.params.handle]);

  const { posts } = data.posts;
  const { loading } = data;
  const { postIdParam } = state;

  const postMarkup =
    posts?.length <= 0 ? (
      <p>No posts from this User</p>
    ) : !postIdParam ? (
      posts?.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts?.map((post) => {
        if (post.postId !== postIdParam)
          return <Post key={post.postId} post={post} />;
        else return <Post key={post.postId} post={post} openDialog />;
      })
    );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {loading ? <p>Loading...</p> : postMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {userProfile ? (
          <StaticProfile profile={userProfile} />
        ) : (
          <p> Loading Profile...</p>
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = {
  getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

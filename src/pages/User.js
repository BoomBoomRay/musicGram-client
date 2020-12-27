import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Post from '../components/post/Post';
import StaticProfile from '../components/profile/StaticProfile.js';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

export const User = ({ getUserData, data, ...props }) => {
  const [state, setstate] = useState({});
  const userProfile = data.posts.user;

  useEffect(() => {
    const handle = props.match.params.handle;
    getUserData(handle);
  }, []);

  const { posts, loading } = data.posts;
  const postMarkup = loading ? (
    <p>Loading....</p>
  ) : posts?.length <= 0 ? (
    <p>No posts from this User</p>
  ) : (
    posts?.map((post) => <Post key={post.postId} post={post} />)
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {postMarkup}
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

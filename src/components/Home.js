import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Profile from './Profile';
import Post from './Post';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const Home = ({ getPosts, ...props }) => {
  const { posts, loading } = props.data;

  useEffect(() => {
    getPosts();
  }, []);

  const recentPostMarkup = !loading ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <p>Loading...</p>
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentPostMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};
Home.propTypes = {
  data: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
  getPosts,
};
export default connect(mapStateToProps, mapActionToProps)(Home);

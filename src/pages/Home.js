import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Profile from '../components/profile/Profile';
import Post from '../components/post/Post';
import PostSkeleton from '../utils/PostSkeleton';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

const Home = ({ getPosts, ...props }) => {
  const { posts, loading } = props.data;
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const recentPostMarkup = !loading ? (
    posts.posts ? (
      posts?.posts.map((post) => <Post key={post.postId} post={post} />)
    ) : (
      posts?.map((post) => <Post key={post.postId} post={post} />)
    )
  ) : (
    <PostSkeleton />
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

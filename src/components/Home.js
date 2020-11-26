import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

import Post from './Post';

export default function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const recentPostMarkup = posts ? (
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
        <p>Profile..j</p>
      </Grid>
    </Grid>
  );
}

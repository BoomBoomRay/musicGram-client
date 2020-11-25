import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default function Home() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    axios
      .get('/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        <p>content..j</p>
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile..j</p>
      </Grid>
    </Grid>
  );
}

import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/musicGramLogo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({ ...theme.form });
const Signup = ({ classes }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newUserData = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      handle: state.handle,
    };
    axios
      .post('/signup', newUserData)
      .then((res) => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        history.push('/');
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  console.log(errors);
  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='musicGram' className={classes.imgLogo} />
        <Typography variant='h3' className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={state.email}
            onChange={handleChange}
            fullWidth
          ></TextField>
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.password}
            onChange={handleChange}
            fullWidth
          ></TextField>
          <TextField
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={state.confirmPassword}
            onChange={handleChange}
            fullWidth
          ></TextField>
          <TextField
            id='handle'
            name='handle'
            type='text'
            label='Handle'
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={state.handle}
            onChange={handleChange}
            fullWidth
          ></TextField>
          {errors.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          {errors.error && (
            <Typography variant='body2' className={classes.customError}>
              {errors.error}
            </Typography>
          )}
          {loading ? (
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  color='primary'
                  size={30}
                  className={classes.progress}
                />
              )}
            </Button>
          ) : (
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Submit
            </Button>
          )}
          <br />
          <small>
            Already have an account ? Login <Link to='/login'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Signup);

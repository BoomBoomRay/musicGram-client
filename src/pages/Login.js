import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/musicGramLogo.png';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Material UI
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({ ...theme.form });

const Login = ({ classes, loginUser, ...props }) => {
  const { errors, loading } = props.UI;
  const [state, setState] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email: state.email, password: state.password };
    loginUser(userData, history);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Grid container className={classes.formContainer}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='musicGram' className={classes.imgLogo} />
        <Typography variant='h3' className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            className={classes.textField}
            helperText={errors?.email}
            error={errors?.email ? true : false}
            value={state?.email}
            onChange={handleChange}
            fullWidth
          ></TextField>
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            className={classes.textField}
            helperText={errors?.password}
            error={errors?.password ? true : false}
            value={state?.password}
            onChange={handleChange}
            fullWidth
          ></TextField>
          {errors?.general && (
            <Typography variant='body2' className={classes.customError}>
              {errors?.general}
            </Typography>
          )}
          {errors?.error && (
            <Typography variant='body2' className={classes.customError}>
              {errors?.error}
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
              Login
            </Button>
          )}
          <br />
          <small>
            Don't have an account ? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Login));

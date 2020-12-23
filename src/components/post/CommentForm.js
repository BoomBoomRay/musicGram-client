import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.form,
});
export const CommentForm = ({
  classes,
  submitComment,
  authenticated,
  postId,
  UI,
}) => {
  const [state, setState] = useState({ body: '' });
  const { errors } = UI;

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prevProps) => ({ ...prevProps, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitComment(postId, { body: state.body });
    setState({ body: '' });
  };

  return (
    <>
      {authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Comment on scream'
              error={errors?.comment ? true : false}
              helperText={errors?.comment}
              value={state.body}
              onChange={handleChange}
              fullWidth
              className={classes.textField}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : null}
    </>
  );
};

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  submitComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CommentForm));

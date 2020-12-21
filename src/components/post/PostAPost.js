import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

// Redux
import { connect, useDispatch } from 'react-redux';
import { sendPost } from '../../redux/actions/dataActions';

//Material UI
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

const style = (theme) => ({
  ...theme.form,
  submitButton: {
    position: 'relative',
    marginTop: '20px',
    float: 'right',
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '6%',
  },
});
export const PostAPost = ({ classes, sendPost, ...props }) => {
  const { errors, loading } = props.UI;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ body: '' });

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { body: state.body };
    sendPost(newPost);
    setOpen(state.body.length <= 0 ? true : false);
    setState({ body: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <MyButton onClick={handleOpen} tip='New Post'>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <MyButton
          onClick={handleClose}
          tip='Close'
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              value={state?.body}
              multiline
              rows='3'
              placeholder='Type a new post'
              error={errors?.body ? true : false}
              helperText={errors?.body}
              className={classes.TextField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type='submit'
              onClick={handleSubmit}
              variant='contained'
              color='primary'
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

PostAPost.propTypes = {
  sendPost: PropTypes.func.isRequired,
  clearError: PropTypes.func,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionToProps = {
  sendPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(PostAPost));

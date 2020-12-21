import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

//Material UI
import Dialog from '@material-ui/core/Dialog';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { DialogContent } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({ ...theme.form, button: { float: 'right' } });

export const EditDetails = ({ credentials, editUserDetails, classes }) => {
  const [state, setState] = useState({
    bio: credentials.bio ? credentials.bio : '',
    website: credentials.website ? credentials.website : '',
    location: credentials.location ? credentials.location : '',
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    editUserDetails(userDetails);
    setOpen(false);
  };

  return (
    <>
      <MyButton
        tip='Edit Details'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </MyButton>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth='sm'>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              type='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={state?.bio}
              onChange={onChange}
              fullWidth
            ></TextField>
            <TextField
              name='website'
              type='text'
              label='Website'
              multiline
              rows='3'
              placeholder='Enter Website'
              className={classes.textField}
              value={state?.website}
              onChange={onChange}
              fullWidth
            ></TextField>
            <TextField
              name='location'
              type='text'
              label='Location'
              multiline
              rows='3'
              placeholder='Enter Location'
              className={classes.textField}
              value={state?.location}
              onChange={onChange}
              fullWidth
            ></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  credentials: state.user.credentials,
});

const mapActionToProps = {
  editUserDetails,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditDetails));

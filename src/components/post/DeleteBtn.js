import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const styles = {
  deleteOutline: { color: 'red' },
  deleteButton: {
    left: '90%',
    position: 'absolute',
    top: '10%',
  },
};

const DeleteBtn = ({ classes, deletePost, postId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const deleteAPost = () => {
    deletePost(postId);
    setOpen(false);
  };
  return (
    <>
      <MyButton
        tip='Delete Post'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline className={classes.deleteOutline} />
      </MyButton>
      <Dialog open={open} onClose={handleOpen} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleOpen} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteAPost} className={classes.deleteOutline}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteBtn.propTypes = {
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};
const mapActionToProps = {
  deletePost,
};
export default connect(null, mapActionToProps)(withStyles(styles)(DeleteBtn));

import React from 'react';
import PropTypes from 'prop-types';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

const FloatingAddButton = ({ openItemEditDialog }) => {
  const classes = useStyles();

  return (
    <Fab className={classes.fab} onClick={openItemEditDialog}>
      <AddIcon />
    </Fab>
  );
};

FloatingAddButton.propTypes = {
  openItemEditDialog: PropTypes.func.isRequired,
};

export default FloatingAddButton;

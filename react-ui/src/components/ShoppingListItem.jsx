import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';

const ShoppingListItem = ({ item, onToggle, onClick }) => {
  const {
    id,
    name,
    section,
    checked,
    additionalInfo,
  } = item;

  return (
    <ListItem id={id} section={section}>
      <ListItemText primary={name} secondary={additionalInfo} />
      <ListItemIcon>
        <IconButton color="primary" onClick={onToggle}>
          {checked ? <AddIcon /> : <CheckIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton onClick={onClick}>
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

ShoppingListItem.propTypes = {
  item: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShoppingListItem;

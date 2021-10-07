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

const ShoppingListItem = ({ item, moveToList, openItemEditDialog }) => {
  const {
    id,
    name,
    section,
    list,
    additionalInfo,
  } = item;

  return (
    <ListItem id={id} section={section}>
      <ListItemText primary={name} secondary={additionalInfo} />
      <ListItemIcon>
        <IconButton color="primary" onClick={moveToList}>
          {list === 'allItems' ? <AddIcon /> : <CheckIcon />}
        </IconButton>
      </ListItemIcon>
      <ListItemSecondaryAction>
        <IconButton onClick={openItemEditDialog}>
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
    list: PropTypes.oneOf(['shoppingList', 'allItems']),
  }).isRequired,
  moveToList: PropTypes.func.isRequired,
  openItemEditDialog: PropTypes.func.isRequired,
};

export default ShoppingListItem;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Select,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSwitch from './ListSwitch';

const useStyles = makeStyles({
  deleteButton: {
    marginRight: 'auto',
  },
});

const ItemEditDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedItem,
  setSelectedItem,
  updateListItem,
  deleteListItem,
  emptyItem,
}) => {
  const handleChange = (event) => (
    setSelectedItem({ ...selectedItem, [event.target.name]: event.target.value })
  );

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedItem(emptyItem);
  };

  const handleSubmit = () => {
    handleClose();
    updateListItem(selectedItem);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Really delete item?')) {
      deleteListItem(selectedItem.id);
      handleClose();
    }
  };

  const classes = useStyles();

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          value={selectedItem.name}
          onChange={handleChange}
          label="Item name"
          fullWidth
          margin="normal"
        />
        <TextField
          name="additionalInfo"
          value={selectedItem.additionalInfo}
          onChange={handleChange}
          label="Additional info"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal">
          <InputLabel>Section</InputLabel>
          <Select name="section" value={selectedItem.section} onChange={handleChange} native>
            <option value="cold">Cold</option>
            <option value="dry">Dry</option>
            <option value="frozen">Frozen</option>
            <option value="vegetable">Vegetable</option>
          </Select>
        </FormControl>
        <ListSwitch list={selectedItem.list} handleChange={handleChange}>
          Include in shopping list
        </ListSwitch>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} className={classes.deleteButton} disabled={!selectedItem.id} color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <div>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </div>
      </DialogActions>
    </Dialog>

  );
};

ItemEditDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    section: PropTypes.oneOf([
      'cold',
      'dry',
      'frozen',
      'vegetable',
    ]),
    list: PropTypes.oneOf(['shoppingList', 'allItems']),
  }).isRequired,
  updateListItem: PropTypes.func.isRequired,
  deleteListItem: PropTypes.func.isRequired,
};

export default ItemEditDialog;

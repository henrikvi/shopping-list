import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import itemsService from '../services/http/items';

const useStyles = makeStyles({
  deleteButton: {
    marginRight: 'auto',
  },
  fullwidthSwitch: {
    display: 'block',
  },
});

const ItemEditDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedItem,
  setSelectedItem,
  updateListItem,
  deleteListItem,
}) => {
  const [dialogFields, setDialogFields] = useState({});

  useEffect(() => {
    if (selectedItem) {
      setDialogFields({
        itemId: selectedItem.id,
        itemName: selectedItem.name,
        itemAdditionalInfo: selectedItem.additionalInfo,
        itemSection: selectedItem.section,
        itemChecked: selectedItem.checked,
      });
    }
  }, [selectedItem]);

  const handleChange = (event) => (
    setDialogFields({ ...dialogFields, [event.target.name]: event.target.value })
  );

  const handleClose = () => {
    setDialogOpen(false);
    setDialogFields({});
    setSelectedItem({});
  };

  const handleSubmit = () => {
    const newItem = {
      id: dialogFields.itemId,
      name: dialogFields.itemName,
      additionalInfo: dialogFields.itemAdditionalInfo,
      section: dialogFields.itemSection,
      checked: dialogFields.itemChecked,
    };
    handleClose();
    updateListItem(newItem);
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Really delete item?')) {
      deleteListItem(dialogFields.itemId);
      handleClose();
      itemsService.deleteItem(dialogFields.itemId);
    }
  };

  const classes = useStyles();

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
      <DialogContent>
        <TextField
          name="itemName"
          value={dialogFields.itemName || ''}
          onChange={handleChange}
          label="Item name"
          fullWidth
          margin="normal"
        />
        <TextField
          name="itemAdditionalInfo"
          value={dialogFields.itemAdditionalInfo || ''}
          onChange={handleChange}
          label="Additional info"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal">
          <InputLabel>Section</InputLabel>
          <Select name="itemSection" native value={dialogFields.itemSection} onChange={handleChange}>
            <option value="cold">Cold</option>
            <option value="dry">Dry</option>
            <option value="frozen">Frozen</option>
            <option value="vegetable">Vegetable</option>
          </Select>
        </FormControl>
        <FormControlLabel
          className={classes.fullwidthSwitch}
          control={
            <Switch name="itemChecked" checked={dialogFields.checked} onChange={(event) => setDialogFields({ ...dialogFields, itemChecked: !event.target.checked })} color="primary" />
          }
          label="Add to shopping list"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} className={classes.deleteButton} disabled={!dialogFields.itemId} color="secondary" startIcon={<DeleteIcon />}>
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
  selectedItem: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    additionalInfo: PropTypes.string,
    section: PropTypes.oneOf([
      'cold',
      'dry',
      'frozen',
      'vegetable',
    ]),
    checked: PropTypes.bool,
  }),
  updateListItem: PropTypes.func.isRequired,
  deleteListItem: PropTypes.func.isRequired,
};

ItemEditDialog.defaultProps = {
  selectedItem: undefined,
};

export default ItemEditDialog;

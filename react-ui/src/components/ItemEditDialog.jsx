import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const ItemEditDialog = ({
  dialogOpen,
  setDialogOpen,
  selectedItem,
  updateListItem,
}) => {
  const emptyItem = {
    itemId: '',
    itemName: '',
    itemAdditionalInfo: '',
    itemSection: '',
    itemChecked: false,
  };

  const [dialogFields, setDialogFields] = useState(emptyItem);

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

  const handleClose = () => setDialogOpen(false);

  const handleSubmit = () => {
    const newItem = {
      id: dialogFields.itemId,
      name: dialogFields.itemName,
      additionalInfo: dialogFields.itemAdditionalInfo,
      section: dialogFields.itemSection,
      checked: dialogFields.itemChecked,
    };
    setDialogOpen(false);
    setDialogFields(emptyItem);
    updateListItem(newItem);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
      <DialogContent>
        <TextField
          name="itemName"
          value={dialogFields.itemName}
          onChange={handleChange}
          label="Item name"
          fullWidth
          margin="normal"
        />
        <TextField
          name="itemAdditionalInfo"
          value={dialogFields.itemAdditionalInfo}
          onChange={handleChange}
          label="Additional info"
          fullWidth
          margin="normal"
        />
        <FormControl margin="normal">
          <InputLabel>Section</InputLabel>
          <Select name="itemSection" native value={dialogFields.itemSection} onChange={handleChange}>
            <option value="" aria-label="None" disabled />
            <option value="cold">Cold</option>
            <option value="dry">Dry</option>
            <option value="frozen">Frozen</option>
            <option value="vegetable">Vegetable</option>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>

  );
};

ItemEditDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
  selectedItem: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    additionalInfo: PropTypes.string.isRequired,
    section: PropTypes.oneOf([
      '',
      'cold',
      'dry',
      'frozen',
      'vegetable',
    ]),
    checked: PropTypes.bool.isRequired,
  }),
  updateListItem: PropTypes.func.isRequired,
};

ItemEditDialog.defaultProps = {
  selectedItem: undefined,
};

export default ItemEditDialog;

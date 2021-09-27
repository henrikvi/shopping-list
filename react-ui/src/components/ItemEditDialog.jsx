import React from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

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
    const newItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      additionalInfo: selectedItem.additionalInfo,
      section: selectedItem.section,
      checked: selectedItem.checked,
    };
    handleClose();
    updateListItem(newItem);
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
    checked: PropTypes.bool.isRequired,
  }).isRequired,
  updateListItem: PropTypes.func.isRequired,
  deleteListItem: PropTypes.func.isRequired,
};

export default ItemEditDialog;

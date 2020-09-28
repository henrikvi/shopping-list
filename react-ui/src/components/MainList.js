import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'


// Dialog dependencies
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

// Select dependencies
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'


const MainList = ({ listItems, dialog, handleToggle, handleClick, handleSubmit, handleClose, handleChange }) => {

    return (
        <>
            <List>
                {
                    listItems
                        .filter(item => !item.checked)
                        .map(item => {
                            return (
                                <ShoppingListItem
                                    key={item.id}
                                    item={item}
                                    onToggle={handleToggle(item.id)}
                                    onClick={handleClick(item)}
                                />
                            )
                        })
                }
            </List>

            <Dialog open={dialog.open} onClose={handleClose}>
                <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <TextField
                        name="itemName"
                        value={dialog.itemName}
                        onChange={handleChange}
                        label="Item name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="itemAdditionalInfo"
                        value={dialog.itemAdditionalInfo}
                        onChange={handleChange}
                        label="Additional info"
                        fullWidth
                        margin="normal"
                    />
                    <FormControl margin="normal">
                    <InputLabel>Section</InputLabel>
                        <Select name="itemSection" native value={dialog.itemSection} onChange={handleChange}>
                            <option value='' disabled />
                            <option value='cold'>Cold</option>
                            <option value='dry'>Dry</option>
                            <option value='frozen'>Frozen</option>
                            <option value='vegetable'>Vegetable</option>
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
        </>
    )
}

export default MainList
import React, { useState, useEffect } from 'react'
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


const ItemEditDialog = ({ dialogOpen, setDialogOpen, selectedItem, listItems, setListItems }) => {

    const [dialogFields, setDialogFields] = useState({
        itemId: '',
        itemName: '',
        itemAdditionalInfo: '',
        itemSection: '',
        itemChecked: false
    })

    useEffect(() => {
        if (selectedItem) {
            setDialogFields({
                itemId: selectedItem.id,
                itemName: selectedItem.name,
                itemAdditionalInfo: selectedItem.additionalInfo,
                itemSection: selectedItem.section,
                itemChecked: selectedItem.checked
            })
        }
    }, [selectedItem])

    const handleChange = (event) => setDialogFields({...dialogFields, [event.target.name]: event.target.value})

    const handleClose = () => setDialogOpen(false)

    const handleSubmit = () => {
        setDialogOpen(false)
        const newItem = {
            id: dialogFields.itemId,
            name: dialogFields.itemName,
            additionalInfo: dialogFields.itemAdditionalInfo,
            section: dialogFields.itemSection,
            checked: dialogFields.itemChecked
        }
        setListItems(listItems.map(item => item.id !== dialogFields.itemId ? item : newItem))
    }

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

    )
}

export default ItemEditDialog
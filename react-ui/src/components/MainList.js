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


const MainList = ({ listItems, setListItems, handleToggle }) => {

    // Dialog

    const [dialog, setDialog] = React.useState({
        open: false,
        itemId: '',
        itemName: '',
        itemAdditionalInfo: '',
        itemSection: '',
        itemChecked: false
    })

    const handleClick = ({ id, name, additionalInfo, section, checked }) => () => {
        setDialog({
            open: true,
            itemId: id,
            itemName: name,
            itemAdditionalInfo: additionalInfo,
            itemSection: section,
            itemChecked: checked
        })
    }

    const handleSubmit = () => {
        setDialog({...dialog, open: false})
        const newItem = {
            id: dialog.itemId,
            name: dialog.itemName,
            additionalInfo: dialog.itemAdditionalInfo,
            section: dialog.itemSection,
            checked: dialog.itemChecked
        }
        setListItems(listItems.map(item => item.id !== dialog.itemId ? item : newItem))
    }

    const handleClose = () => setDialog({...dialog, open: false})

    // Form

    const handleChange = (event) => {
        // Not completely sure if event.target.name is a legit way of doing this.
        // If not, maybe pass the propName as an argument and return an appropriate handler
        setDialog({...dialog, [event.target.name]: event.target.value})
    }

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
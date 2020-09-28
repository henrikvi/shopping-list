import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import handleToggle from '../utils/list'


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


const MainList = ({ listItems, setListItems }) => {

    // Dialog
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const handleClick = ({ id, name, additionalInfo, section }) => () => {
        setDialogOpen(true)
        setItemId(id)
        setItemName(name)
        setAdditionalInfo(additionalInfo)
        setSection(section)
    }

    const handleSubmit = () => {
        setDialogOpen(false)
        const newItem = {
            'id': itemId,
            'name': itemName,
            'additionalInfo': additionalInfo,
            'section': section,
            'checked': false
        }
        setListItems(listItems.map(item => item.id !== itemId ? item : newItem))
    }

    // Form

    const [itemId, setItemId] = React.useState('')
    const [itemName, setItemName] = React.useState('')
    const [additionalInfo, setAdditionalInfo] = React.useState('')
    const [section, setSection] = React.useState('')

    const handleChange = (setState) => (event) => {
        setState(event.target.value)
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
                                    handleToggle={handleToggle(item.id, setListItems, listItems)}
                                    handleClick={handleClick(item)}
                                />
                            )
                        })
                }
            </List>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle id="form-dialog-title">Edit item</DialogTitle>
                <DialogContent>
                    <TextField
                        value={itemName}
                        onChange={handleChange(setItemName)}
                        label="Item name"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        value={additionalInfo}
                        onChange={handleChange(setAdditionalInfo)}
                        label="Additional info"
                        fullWidth
                        margin="normal"
                    />
                    <FormControl margin="normal">
                    <InputLabel>Section</InputLabel>
                        <Select native value={section} onChange={handleChange(setSection)}>
                            <option value='' disabled />
                            <option value='cold'>Cold</option>
                            <option value='dry'>Dry</option>
                            <option value='frozen'>Frozen</option>
                            <option value='vegetable'>Vegetable</option>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
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
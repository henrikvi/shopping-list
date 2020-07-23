import React from 'react'
import { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add'


const ShoppingListItem = ({ item, handleToggle }) => {
    const { name, checked } = item

    return (
        <ListItem button onClick={handleToggle}>
            <ListItemText primary={name} secondary='3 pcs' />
            <ListItemIcon>
                <IconButton color='primary'>
                    {checked ? <AddIcon /> : <CheckIcon />}
                </IconButton>
            </ListItemIcon>
            <ListItemSecondaryAction>
                <IconButton>
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ShoppingListItem
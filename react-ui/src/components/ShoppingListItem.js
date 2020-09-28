import React from 'react'
import { ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'


const ShoppingListItem = ({ item, onToggle, onClick }) => {
    const { name, checked, additionalInfo } = item

    return (
        <ListItem>
            <ListItemText primary={name} secondary={additionalInfo} />
            <ListItemIcon>
                <IconButton color='primary' onClick={onToggle}>
                    {checked ? <AddIcon /> : <CheckIcon />}
                </IconButton>
            </ListItemIcon>
            <ListItemSecondaryAction>
                <IconButton onClick={onClick}>
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default ShoppingListItem
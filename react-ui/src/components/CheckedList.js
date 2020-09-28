import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'

const CheckedList = ({ listItems, handleToggle }) => {

    return (
        <List>
            {
                listItems
                    .filter(item => item.checked)
                    .map(item => <ShoppingListItem key={item.id} item={item} onToggle={handleToggle(item.id)} />)
            }
        </List>
    )
}

export default CheckedList
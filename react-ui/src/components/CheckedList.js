import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import handleToggle from '../utils/list'

const CheckedList = ({ listItems, setListItems }) => {

    return (
        <List>
            {
                listItems
                    .filter(item => item.checked)
                    .map(item => <ShoppingListItem key={item.id} item={item} handleToggle={handleToggle(item.id, setListItems, listItems)} />)
            }
        </List>
    )
}

export default CheckedList
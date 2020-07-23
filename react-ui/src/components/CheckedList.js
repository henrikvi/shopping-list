import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import handleToggle from '../utils/list'

/*
CheckedList provides a reference of list items that have already
been picked up, and provides means to delete items (I don't want
my girlfriend deleting items that should stay available in the
pool of common groceries – she will, if its too easy)
*/

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
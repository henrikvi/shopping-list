import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import ItemEditDialog from './ItemEditDialog'


const MainList = ({ listItems, handleToggle, handleClick, dialog, handleSubmit, handleClose, handleChange }) => {

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
            <ItemEditDialog
                dialog={dialog}
                handleSubmit={handleSubmit}
                handleClose={handleClose}
                handleChange={handleChange}
            />
        </>
    )
}

export default MainList
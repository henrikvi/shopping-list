import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import ItemEditDialog from './ItemEditDialog'


const MainList = ({ listItems, setListItems, handleToggle, dialogOpen, setDialogOpen }) => {
    
    const [selectedItem, setSelectedItem] = React.useState()

    const handleClick = (item) => () => {
        setDialogOpen(true)  
        setSelectedItem(item)
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
            <ItemEditDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                selectedItem={selectedItem}
                listItems={listItems}
                setListItems={setListItems}
            />
        </>
    )
}

export default MainList
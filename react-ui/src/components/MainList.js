import React from 'react'
import { List } from '@material-ui/core'
import ShoppingListItem from './ShoppingListItem'
import ItemEditDialog from './ItemEditDialog'


const MainList = ({ listItems, handleToggle, dialogOpen, setDialogOpen, updateListItem }) => {
    
    const [selectedItem, setSelectedItem] = React.useState()

    const handleClick = (item) => () => {
        setDialogOpen(true)  
        setSelectedItem(item)
      }

    const getListItems = () => {
        return (
            listItems
                .filter(item => !item.checked)
                .map(item => <ShoppingListItem key={item.id} item={item} onToggle={handleToggle(item.id)} onClick={handleClick(item)} />)
        )
    }

    return (
        <>
            <List>
                {getListItems()}
            </List>
            <ItemEditDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                selectedItem={selectedItem}
                updateListItem={updateListItem}
            />
        </>
    )
}

export default MainList
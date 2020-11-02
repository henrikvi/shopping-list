import React, { useState } from 'react'
import { Grid, Paper, Tab, Tabs, AppBar, List } from '@material-ui/core'
import Header from './components/Header'
import Content from './components/Content'
import ShoppingListItem from './components/ShoppingListItem'
import ItemEditDialog from './components/ItemEditDialog'

let items = [
  { 'id': 1, 'name': 'bananas', 'section': 'vegetable', 'checked': false, 'additionalInfo': '3 pcs' },
  { 'id': 2, 'name': 'apples', 'section': 'vegetable', 'checked': false, 'additionalInfo': '3 pcs' },
  { 'id': 3, 'name': 'bread', 'section': 'dry', 'checked': false, 'additionalInfo': '3 pcs' },
  { 'id': 4, 'name': 'butter', 'section': 'cold', 'checked': true, 'additionalInfo': '3 pcs' },
  { 'id': 5, 'name': 'cheese', 'section': 'cold', 'checked': false, 'additionalInfo': '3 pcs' },
]

function App() {

  const [listItems, setListItems] = useState(items)
  const [tabValue, setTabValue] = useState('MainList')
  const [dialogOpen, setDialogOpen] = useState(false)

  const [selectedItem, setSelectedItem] = React.useState()

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleToggle = (id) => () => {
    setListItems(listItems.map(item => item.id !== id ?
      item : { ...item, checked: !item.checked }
    ))
  }

  const handleClick = (item) => () => {
    setDialogOpen(true)
    setSelectedItem(item)
  }

  const getMainListItems = () => {
    return (
      listItems
        .filter(item => !item.checked)
        .map(item => <ShoppingListItem key={item.id} item={item} onToggle={handleToggle(item.id)} onClick={handleClick(item)} />)
    )
  }

  const getCheckedListItems = () => {
    return (
      listItems
        .filter(item => item.checked)
        .map(item => <ShoppingListItem key={item.id} item={item} onToggle={handleToggle(item.id)} onClick={handleClick(item)} />)
    )
  }

  const updateListItem = (newItem) => {
    // map through items, return unmodified item if id doesn't match and newItem if it matches
    setListItems(listItems.map(item => item.id !== newItem.id ? item : newItem))
  }


  return (
    <Grid container direction='column'>
      <Header />
      <Content>
        <AppBar position="static" color='default' elevation={2}>
          <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth'>
            <Tab label="Shopping list" value='MainList' />
            <Tab label="All items" value='CheckedList' />
          </Tabs>
        </AppBar>
        <Paper hidden={tabValue !== 'MainList'}>
          <List>
            {getMainListItems()}
          </List>
        </Paper>
        <Paper hidden={tabValue !== 'CheckedList'}>
          <List>
            {getCheckedListItems()}
          </List>
        </Paper>
      </Content>
      <ItemEditDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            selectedItem={selectedItem}
            updateListItem={updateListItem}
      />
    </Grid>
  )
}

export default App

import React, { useState } from 'react'
import { Grid, Paper, Tab, Tabs, AppBar } from '@material-ui/core'
import Header from './components/Header'
import Content from './components/Content'
import MainList from './components/MainList'
import CheckedList from './components/CheckedList'

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleToggle = (id) => () => {
    setListItems(listItems.map(item => item.id !== id ?
      item : { ...item, checked: !item.checked }
    ))
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
          <MainList
            listItems={listItems}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            handleToggle={handleToggle}
            updateListItem={updateListItem}
          />
        </Paper>
        <Paper hidden={tabValue !== 'CheckedList'}>
          <CheckedList listItems={listItems} setListItems={setListItems} handleToggle={handleToggle} />
        </Paper>
      </Content>
    </Grid>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { Grid, Paper, Tab, Tabs, AppBar } from '@material-ui/core'
import Header from './components/Header'
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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleToggle = (id) => () => {
    setListItems(listItems.map(item => item.id !== id ?
      item : { ...item, checked: !item.checked }
    ))
  }

  // Dialog

  const [dialog, setDialog] = React.useState({
    open: false,
    itemId: '',
    itemName: '',
    itemAdditionalInfo: '',
    itemSection: '',
    itemChecked: false
})

const handleClick = ({ id, name, additionalInfo, section, checked }) => () => {
    setDialog({
        open: true,
        itemId: id,
        itemName: name,
        itemAdditionalInfo: additionalInfo,
        itemSection: section,
        itemChecked: checked
    })
}

const handleSubmit = () => {
    setDialog({...dialog, open: false})
    const newItem = {
        id: dialog.itemId,
        name: dialog.itemName,
        additionalInfo: dialog.itemAdditionalInfo,
        section: dialog.itemSection,
        checked: dialog.itemChecked
    }
    setListItems(listItems.map(item => item.id !== dialog.itemId ? item : newItem))
}

const handleClose = () => setDialog({...dialog, open: false})

// Form

const handleChange = (event) => {
    // Not completely sure if event.target.name is a legit way of doing this.
    // If not, maybe pass the propName as an argument and return an appropriate handler
    setDialog({...dialog, [event.target.name]: event.target.value})
}

  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={false} sm={3} />
        <Grid item xs={12} sm={6}>

          <AppBar position="static" color='default' elevation={2}>
            <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth'>
              <Tab label="Shopping list" value='MainList' />
              <Tab label="All items" value='CheckedList' />
            </Tabs>
          </AppBar>

          <Paper hidden={tabValue !== 'MainList'}>
            <MainList
              listItems={listItems}
              dialog={dialog}
              handleToggle={handleToggle}
              handleClick={handleClick}
              handleSubmit={handleSubmit}
              handleClose={handleClose}
              handleChange={handleChange}
              />
          </Paper>
          <Paper hidden={tabValue !== 'CheckedList'}>
            <CheckedList listItems={listItems} setListItems={setListItems} handleToggle={handleToggle} />
          </Paper>
        </Grid>
        <Grid item xs={false} sm={3} />
      </Grid>
    </Grid>
  )
}

export default App

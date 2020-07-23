import React, { useState, useEffect } from 'react'
import { Grid, Paper, Tab, Tabs, AppBar } from '@material-ui/core'
import Header from './components/Header'
import MainList from './components/MainList'
import CheckedList from './components/CheckedList'

let items = [
  { 'id': 1, 'name': 'bananas', 'section': 'vegetable', 'checked': false },
  { 'id': 2, 'name': 'apples', 'section': 'vegetable', 'checked': false },
  { 'id': 3, 'name': 'bread', 'section': 'dry', 'checked': false },
  { 'id': 4, 'name': 'butter', 'section': 'cold', 'checked': true },
  { 'id': 5, 'name': 'cheese', 'section': 'cold', 'checked': false },
]

function App() {

  const [listItems, setListItems] = useState(items)
  const [tabValue, setTabValue] = useState('MainList')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
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
            <MainList listItems={listItems} setListItems={setListItems} />
          </Paper>
          <Paper hidden={tabValue !== 'CheckedList'}>
            <CheckedList listItems={listItems} setListItems={setListItems} />
          </Paper>
        </Grid>
        <Grid item xs={false} sm={3} />
      </Grid>
    </Grid>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Tab,
  Tabs,
  AppBar,
  List,
} from '@material-ui/core';
import Header from './components/Header';
import Content from './components/Content';
import ShoppingListItem from './components/ShoppingListItem';
import ItemEditDialog from './components/ItemEditDialog';
import FloatingAddButton from './components/FloatingAddButton';
import itemsService from './services/http/items';

function App() {
  const [listItems, setListItems] = useState([]);
  const [tabValue, setTabValue] = useState('ShoppingList');
  const [dialogOpen, setDialogOpen] = useState(false);

  const emptyItem = {
    name: '',
    additionalInfo: '',
    section: 'cold',
    list: 'shoppingList',
  }
  const [selectedItem, setSelectedItem] = React.useState(emptyItem);

  const getListItems = async () => {
    try {
      const asd = await itemsService.getAllItems();
      setListItems(asd);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('Error retrieving items');
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const moveToList = (itemToMove, newList) => () => {
    const newItem = {...itemToMove, list: newList};

    setListItems(listItems.map((item) => (
      itemToMove.id === item.id ? newItem : item
    )));    
    itemsService.updateItem(newItem);
  };

  const openItemEditDialog = (item) => () => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const shoppingListItems = listItems.filter((item) => item.list === 'shoppingList').map((item) => (
    <ShoppingListItem
      key={item.id}
      item={item}
      moveToList={moveToList(item, 'allItems')}
      openItemEditDialog={openItemEditDialog(item)}
    />
  ))

  const allItems = listItems.filter((item) => item.list === 'allItems' ).map((item) => (
    <ShoppingListItem
      key={item.id}
      item={item}
      moveToList={moveToList(item, 'shoppingList')}
      openItemEditDialog={openItemEditDialog(item)}
    />
  ))

  const updateListItem = (newItem) => {
    if (!newItem.id) {
      // eslint-disable-next-line no-param-reassign
      newItem.id = listItems.length + 1;
    }

    if (listItems.find((item) => item.id === newItem.id)) {
      setListItems(listItems.map((item) => (
        item.id !== newItem.id ? item : newItem
      )));
      itemsService.updateItem(newItem);
    } else {
      setListItems(listItems.concat(newItem));
      itemsService.addItem(newItem);
    }
  };

  const deleteListItem = (id) => {
    setListItems(listItems.filter((item) => id !== item.id));
    itemsService.deleteItem(id);
  };

  return (
    <Grid container direction="column">
      <Header />
      <Content>
        <AppBar position="static" color="default" elevation={2}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Shopping list" value="ShoppingList" />
            <Tab label="All items" value="AllItems" />
          </Tabs>
        </AppBar>
        <Paper hidden={tabValue !== 'ShoppingList'}>
          <List>
            {shoppingListItems}
          </List>
        </Paper>
        <Paper hidden={tabValue !== 'AllItems'}>
          <List>
            {allItems}
          </List>
        </Paper>
      </Content>
      <FloatingAddButton openItemEditDialog={openItemEditDialog(emptyItem)} />
      <ItemEditDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        updateListItem={updateListItem}
        deleteListItem={deleteListItem}
        emptyItem={emptyItem}
      />
    </Grid>
  );
}

export default App;

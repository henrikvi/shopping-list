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
  const [tabValue, setTabValue] = useState('MainList');
  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] = React.useState();

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

  const toggleItemChecked = (id) => () => {
    setListItems(listItems.map((item) => (
      item.id !== id ? item : { ...item, checked: !item.checked }
    )));
  };

  const openItemEditDialog = (item) => () => {
    setDialogOpen(true);
    setSelectedItem(item);
  };

  const getMainListItems = () => (
    listItems
      .filter((item) => !item.checked)
      .map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          toggleItemChecked={toggleItemChecked(item.id)}
          openItemEditDialog={openItemEditDialog(item)}
        />
      ))
  );

  const getCheckedListItems = () => (
    listItems
      .filter((item) => item.checked)
      .map((item) => (
        <ShoppingListItem
          key={item.id}
          item={item}
          toggleItemChecked={toggleItemChecked(item.id)}
          openItemEditDialog={openItemEditDialog(item)}
        />
      ))
  );

  const updateListItem = (newItem) => {
    if (!newItem.id) {
      // eslint-disable-next-line no-param-reassign
      newItem.id = listItems.length + 1;
    }

    if (listItems.find((item) => item.id === newItem.id)) {
      // If an item with the same id exists:
      // map through items, return unmodified item if
      // id doesn't match and newItem if it matches
      setListItems(listItems.map((item) => (
        item.id !== newItem.id ? item : newItem
      )));
    } else {
      setListItems(listItems.concat(newItem));
    }
  };

  return (
    <Grid container direction="column">
      <Header />
      <Content>
        <AppBar position="static" color="default" elevation={2}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Shopping list" value="MainList" />
            <Tab label="All items" value="CheckedList" />
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
      <FloatingAddButton openItemEditDialog={openItemEditDialog()} />
      <ItemEditDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedItem={selectedItem}
        updateListItem={updateListItem}
      />
    </Grid>
  );
}

export default App;

import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => (
  <Grid item xs={12}>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Shopping list
        </Typography>
      </Toolbar>
    </AppBar>
  </Grid>
);

export default Header;

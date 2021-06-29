import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const Content = ({ children }) => (
  <Grid item container>
    <Grid item xs={false} sm={3} />
    <Grid item xs={12} sm={6}>
      {children}
    </Grid>
    <Grid item xs={false} sm={3} />
  </Grid>
);

Content.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Content;

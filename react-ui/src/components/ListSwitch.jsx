import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  fullwidthSwitch: {
    display: 'block',
  },
});

const ListSwitch = ({list, handleChange, children}) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(list === 'shoppingList' ? true : false)

  const handleToggle = (checked, setChecked, handleChange) => () => {
    const fakeEvent = {target: {name: 'list', value: checked ? 'allItems' : 'shoppingList' }}
    handleChange(fakeEvent);
    setChecked(!checked);
  };

  return (
    <FormControlLabel
    className={classes.fullwidthSwitch}
    label={children}
    control={
      <Switch
        name="list"
        checked={checked}
        onChange={handleToggle(checked, setChecked, handleChange)}
        color="primary" />
    }
    />
  );
};

ListSwitch.propTypes = {
  list: PropTypes.oneOf(['shoppingList', 'allItems']),
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export default ListSwitch;

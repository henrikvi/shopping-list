import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const Header = () => {

    return (
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
    )
}

export default Header
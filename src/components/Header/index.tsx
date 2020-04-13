import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const Header: React.FC = () => {
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                            Bitcoin Address Generator
                    </Typography>
                </Toolbar>
            </AppBar>
        </div >

    )
}

export { Header };
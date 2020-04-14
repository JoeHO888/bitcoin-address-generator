import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ReorderIcon from '@material-ui/icons/Reorder';

const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton component={Link} to={'/'} color="inherit">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Bitcoin Address Generator
                    </Typography>

                    <section style={{
                        marginLeft: 'auto',
                        marginRight: -12,
                    }}>
                    </section>
                    <IconButton onClick={handleClick} color="inherit">
                        <ReorderIcon />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={Link} to={'/'} onClick={handleClose}>
                            Home
                        </MenuItem>

                        <MenuItem component={Link} to={'/hd-generator'} onClick={handleClose}>
                            HD Generator
                        </MenuItem>

                        <MenuItem component={Link} to={'/multisig-generator'} onClick={handleClose}>
                            Multi Sig Generator
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div >

    )
}

export { Header };
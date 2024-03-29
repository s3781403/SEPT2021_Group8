import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import {makeStyles, createStyles} from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {useContext, useEffect, useState} from "react";
import logo from '../../assets/images/bookero.png'
import {AppContext} from "../../context/AppContext";
import {useHistory, Link, Redirect} from "react-router-dom";
import {Avatar} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import Button from "@mui/material/Button";
import {logout} from "../../api/login";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
        width: '60%'
    }
}));


const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const HeaderAppBar = styled(AppBar)(({theme}) => ({
    padding: theme.spacing(2, 0, 2, 0),
}));

const useStyles = makeStyles((theme) =>
    createStyles({
        logo: {
            maxWidth: 40,
            marginRight: '10px'
        }
    })
);

function PrimarySearchAppBar({cartItemCount, notificationCount}) {


    const history = useHistory();
    const loginPageOpen = () => {history.push('/login')};
    const cartPageOpen = () => {history.push('/cart')};

    const {searchTerm,setSearchTerm, user, setUser} = useContext(AppContext)


    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const classes = useStyles();


    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={cartItemCount} color="error">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label={`show ${notificationCount} new notifications`}
                    color="inherit"
                >
                    <Badge badgeContent={notificationCount} color="error">
                        <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {!user ? <AccountCircle/> : <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name[0]}</Avatar>}
                    {/*<AccountCircle/>*/}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{flexGrow: 1}}>
            <HeaderAppBar position="static">
                <Toolbar>


                    <img src={logo} className={classes.logo}/>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{display: {xs: 'none', sm: 'block'}}}
                    >
                        <Link style={{color: "inherit", textDecoration: 'none'}} to={"/"}>BOOKERO</Link>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for a book by its ID, Name, Author or Category 📚 "
                            inputProps={{'aria-label': 'search'}}
                            style={{width: '100%'}}
                            value={searchTerm}
                            onChange={(e) => {
                                let newText = e.target.value;
                                console.log("🔦: ", newText);
                                setSearchTerm(newText)
                            }}
                        />
                    </Search>

                    <Box sx={{flexGrow: 1}}/>
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {user ? <Button variant={'outlined'} style={{color:'white'}} onClick={()=> {
                            history.push("/orderhistory")
                        }} >Order History</Button> : null }

                        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={cartPageOpen}>
                            <Badge badgeContent={cartItemCount} color="error">
                                <ShoppingCartIcon/>
                            </Badge>
                        </IconButton>


                        <IconButton onClick={loginPageOpen}
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            {!user ? <AccountCircle/> : <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name[0]}</Avatar>}

                        </IconButton>

                        {user ? <Button variant={'outlined'} style={{color:'white'}} onClick={logout}>Logout</Button> : null }


                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </HeaderAppBar>
            {renderMobileMenu}
        </Box>
    );
}


function AppHeader() {

    const {cartItemCount} = useContext(AppContext)
    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setNotificationCount(1)
        }, 2000)
    }, [])

    return <div>
        <PrimarySearchAppBar cartItemCount={cartItemCount} notificationCount={notificationCount}/>
    </div>
}

export default AppHeader
import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from './SearchBar';

const drawerWidth = 240;

const SearchContainer = styled(Toolbar)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Header = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: '#fff',
                color: '#000',
                boxShadow: 'none',
                borderBottom: '1.5px solid #ddd'
            }}
            data-testid="header"
        >
            <SearchContainer>
                <SearchBar />
            </SearchContainer>
        </AppBar>
    );
};

export default Header;

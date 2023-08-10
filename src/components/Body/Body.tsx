import React, { FC, useEffect, useState } from 'react';
import { BodyWrapper, FooterWrapper } from './Body.styled';
import AdminSection from '../AdminSection/AdminSection';
import Dropdown from '@mui/base/Dropdown';
import Menu from '@mui/base/Menu';
import MenuButton from '@mui/base/MenuButton';
import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import ServiceOwnerSection from '../ServiceOwnerSection/ServiceOwnerSection';
import { HeaderWrapper } from './Body.styled';
import { Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VendorSection from '../VendorSection/VendorSection';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showError } from '../../reducers/appState';

interface BodyProps { }

export interface User {
   id: Number,
   name: String,
   role: String,
   scopes: String[]
}

const Body: FC<BodyProps> = () => {

   const dispatch = useDispatch();

   const [user, setUser] = useState<User>();

   const [users, setUsers] = useState<User[]>([]);

   const createHandleMenuClick = (menuItem: User) => {
      //return () => {
         setUser(menuItem)
      //};
   };

   async function fetchUsers(success?: (arg0: User) => void) {
      axios.get('/employees')
         .then((response) => {
            setUsers(response.data)
            success && success(response.data[0])
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         })
   }

   useEffect(() => {
      fetchUsers((a) => {setUser(a)});
   }, [])

   return (
      <>
      <HeaderWrapper>

         <h2>Contracts & Vendors Management System</h2>
         <Dropdown >
               <TriggerButton >
                  <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
                     {user?.name}
                     <ArrowDropDownIcon/>
                  </div>
               </TriggerButton>
               <Menu slots={{ listbox: StyledListbox }}  >
                  {users.map((item) =>
                     <StyledMenuItem key={''+item.id} onClick={() => {createHandleMenuClick(item)}}>
                        {item.name+" - "+item.role}
                     </StyledMenuItem>
                  )}
               </Menu>
            </Dropdown>
      </HeaderWrapper>
      < BodyWrapper >

         {user && user.scopes && user.scopes.includes("ADMIN") && <AdminSection user={user}/>}
         {user && user.scopes && (user.scopes.includes("SERVICE_OWNER") || user.scopes.includes("ADMIN"))
          && <ServiceOwnerSection user={user}/>}
         {user && user.scopes && user.scopes.includes("VENDOR") && <VendorSection user={user}/>}
      </BodyWrapper >
      <FooterWrapper>
         Created by Manish Jindal
      </FooterWrapper>
      </>
   )
};

const blue = {
   100: '#DAECFF',
   200: '#99CCF3',
   400: '#3399FF',
   500: '#007FFF',
   600: '#0072E5',
   900: '#003A75',
};

const grey = {
   50: '#f6f8fa',
   100: '#eaeef2',
   200: '#d0d7de',
   300: '#afb8c1',
   400: '#8c959f',
   500: '#6e7781',
   600: '#57606a',
   700: '#424a53',
   800: '#32383f',
   900: '#24292f',
};

const StyledListbox = styled('ul')(
   ({ theme }) => `
   font-family: IBM Plex Sans, sans-serif;
   font-size: 0.875rem;
   box-sizing: border-box;
   padding: 6px;
   margin: 12px 0;
   min-width: 200px;
   border-radius: 12px;
   overflow: auto;
   outline: 0px;
   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
   z-index: 1;
   `,
);

const StyledMenuItem = styled(MenuItem)(
   ({ theme }) => `
   list-style: none;
   padding: 8px;
   border-radius: 8px;
   cursor: default;
   user-select: none;

   &:last-of-type {
     border-bottom: none;
   }

   &.${menuItemClasses.focusVisible} {
     outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
     background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
   }

   &.${menuItemClasses.disabled} {
     color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
   }

   &:hover:not(.${menuItemClasses.disabled}) {
     background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
     color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
   }
   `,
);

const TriggerButton = styled(MenuButton)(
   ({ theme }) => `
   font-family: IBM Plex Sans, sans-serif;
   font-size: 0.875rem;
   font-weight: 600;
   box-sizing: border-box;
   height: 40px;
   min-width: 160px;
   border-radius: 5px;
   padding: 8px 14px;
   line-height: 1.5;
   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

   transition-property: all;
   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
   transition-duration: 120ms;

   &:hover {
     background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
     border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
   }

   &:focus-visible {
     border-color: ${blue[400]};
     outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
   }
   `,
);

export default Body;

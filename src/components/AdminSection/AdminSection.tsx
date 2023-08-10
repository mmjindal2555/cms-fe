import React, { FC, useEffect, useState } from 'react';
import { AdminSectionWrapper, DarkText } from './AdminSection.styled';
import {  VendorsTable } from '../VendorsTable/VendorsTable';
import { Contract, ContractsTable } from '../ContractsTable/ServiceContractsTable';
import { InfoWrapper, Column } from './../Body/Body.styled'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../Body/Body';
import { CreateContractWrapper } from '../ServiceOwnerSection/ServiceOwnerSection.styled';
import { useDispatch, useSelector } from 'react-redux';
import { performRefreshContracts, performRefreshVendors, showError, showSuccess } from '../../reducers/appState';
import { useAppSelector } from '../../hooks';

interface AdminSectionProps {
   user: User
}

function AdminSection(props: AdminSectionProps) {

   const dispatch = useDispatch()
   const refreshVendors = useAppSelector(state => state.refreshVendors)
   const refreshContracts = useAppSelector(state => state.refreshContracts)

   const [vendors, setVendors] = useState([]);
   const [contracts, setContracts] = useState<Contract[]>([]);
   const [contract, setContract] = useState<Contract | undefined>();
   const [toApproveContracts, setToApproveContracts] = useState<Map<string, Contract>>(new Map<string, Contract>());

   const [firstName, setFirstName] = useState<String>('');
   const [lastName, setLastName] = useState<String>('');
   const [role, setRole] = useState<String>('');

   const handleActionSelected = (event: SelectChangeEvent) => {
      setContract(toApproveContracts.get(event.target.value));
   };

   function handleUpdateContractStatus() {
      const url = '/contracts/' + contract?.id;
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         state: "APPROVED"
      }, config)
         .then((response) => {
            dispatch(showSuccess("Contract is now APPROVED"))
            console.log(response.data);
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
            console.log(error);
         }).finally(() => {
            dispatch(performRefreshContracts(true));
            setContract(undefined);
         })
   }

   function handleAddVendor() {
      const url = '/vendors/';
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.post(url, {
         firstName: firstName,
         lastName: lastName,
         role: role,
         startDate: (new Date().getTime()) / 1000
      }, config)
         .then((response) => {
            dispatch(showSuccess("Vendor added successfully"))
            console.log(response.data);
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
            console.log(error);
         }).finally(() => {
            setFirstName('');
            setLastName('');
            setRole('');
            dispatch(performRefreshVendors(true));
         })
   }

   async function fetchVendors() {
      const response = await fetch('/vendors');
      setVendors(await response.json())
   }
   async function fetchContracts() {
      const response = await fetch('/contracts');
      const contracts = await response.json() as Contract[];
      setContracts(contracts);

      const map = new Map<string, Contract>();
      for (const item of contracts) {
         if(item.currentState === "DRAFT"){
            map.set('' + item.id, item);
         }
      }
      setToApproveContracts(map)
   }
   useEffect(() => {
      fetchVendors();
      fetchContracts();
   }, [])

   useEffect(() => {
      debugger
      if(refreshVendors){
         fetchVendors();
      }
      if(refreshContracts){
         fetchContracts();
      }
      dispatch(performRefreshVendors(false))
      dispatch(performRefreshContracts(false))

   }, [ refreshVendors, refreshContracts])

   return (
      <AdminSectionWrapper>
         <InfoWrapper>
            <Column>
               <h3>All Vendors</h3>
               <VendorsTable rows={vendors} />
            </Column>
            <Column>
               <h3>All Service Contracts</h3>
               <ContractsTable rows={contracts} />
            </Column>
         </InfoWrapper>



         <CreateContractWrapper>
            <DarkText>Approve Service Contracts</DarkText>

            <FormControl sx={{ minWidth: 220 }} size="small">
               <InputLabel id="simple-select-label">Select Contract</InputLabel>
               <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={""+contract?.id ?? ""}
                  label="Select Contract"
                  onChange={handleActionSelected}
                  displayEmpty
                  autoWidth
                  variant='outlined'
               >
                  {Array.from(toApproveContracts.keys()).map((key) => {
                     const c = toApproveContracts.get(key)
                     return <MenuItem value={""+key}>{c?.description ?? "-" + c?.id}</MenuItem>
                  })}
               </Select>
            </FormControl>

            <br />
            <Button
               onClick={handleUpdateContractStatus}
               variant="contained"
            >
               Submit
            </Button>

         </CreateContractWrapper>
         <CreateContractWrapper>
            <DarkText>Add a new Vendor</DarkText>

            <TextField
               type="text"
               id='fn'
               onChange={(e) => {setFirstName(e.target.value)}}
               value={firstName}
               variant="outlined"
               label="First Name"
               size="small"
               placeholder='Enter First Name'
               required={true}
               sx={{ backgroundColor: '#fff', width: '280px' }}
            />
             <TextField
               type="text"
               id='ln'
               onChange={(e) => {setLastName(e.target.value)}}
               value={lastName}
               variant="outlined"
               label="Last Name"
               size="small"
               placeholder='Enter Last Name'
               required={true}
               sx={{ backgroundColor: '#fff', width: '280px' }}
            />
            <TextField
               type="text"
               id='ln'
               onChange={(e) => {setRole(e.target.value)}}
               value={role}
               variant="outlined"
               label="Role"
               size="small"
               placeholder='Enter Role'
               required={true}
               sx={{ backgroundColor: '#fff', width: '280px' }}
            />

            <br />
            <Button
               onClick={handleAddVendor}
               variant="contained"
            >
               Add
            </Button>

         </CreateContractWrapper>
      </AdminSectionWrapper>
   )
};

export default AdminSection;

import React, { FC, useEffect, useState } from 'react';
import { ServiceOwnerSectionWrapper, CreateContractWrapper } from './ServiceOwnerSection.styled';
import axios, { AxiosRequestConfig } from 'axios';
import { User } from '../Body/Body';
import { VendorsTable } from '../VendorsTable/VendorsTable';
import { ContractsTable } from '../ContractsTable/ServiceContractsTable';
import TextField from '@mui/material/TextField';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { InfoWrapper, Column } from '../Body/Body.styled';
import { act } from 'react-dom/test-utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { performRefreshVendors, showError, showSuccess, performRefreshContracts } from '../../reducers/appState';

interface ServiceOwnerSectionProps {
   user: User
}

const ServiceOwnerSection: FC<ServiceOwnerSectionProps> = (props) => {

   const dispatch = useAppDispatch
   const refreshVendors = useAppSelector(state => state.refreshVendors)
   const refreshContracts = useAppSelector(state => state.refreshContracts)

   const [vendors, setVendors] = useState([]);
   const [contracts, setContracts] = useState([]);

   const [textarea, setTextarea] = useState('');
   const [vendorID, setVendorID] = useState<Number>(0);
   const [serviceContractNo, setServiceContractNo] = useState<Number>(0);
   const [newContractID, setNewContractID] = useState<Number>(0);
   const [action, setAction] = React.useState("0");

   const handleActionSelected = (event: SelectChangeEvent) => {
      setAction(event.target.value as string);
   };

   const handleChange = (event: any) => {
      setTextarea(event.target.value)
   }

   const options = [
      {key:"1", value: "Make Contract active"},
      {key:"2", value: "Make Contract inactive"},
      {key:"3", value: "Create new contract"},
      {key:"4", value: "Onboard vendor to a contract"},
      {key:"5", value: "Offboard vendor from a contract"},
      {key:"6", value: "Change mapping of a vendor"}
   ]

   function makeContractActive(){
      debugger
      const url = '/contracts/'+serviceContractNo;
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         state: "ACTIVE"
      }, config)
         .then((response) => {
            console.log(response.data);
            dispatch(showSuccess("Contract is now ACTIVE"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshContracts(true));
         })
   }

   function makeContractInactive(){
      const url = '/contracts/'+serviceContractNo
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         state: "INACTIVE"
      }, config)
         .then((response) => {
            dispatch(showSuccess("Contract is now INACTIVE"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshContracts(true));
            dispatch(performRefreshVendors(true));
         })
   }

   function createContract(){
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.post('/contracts/', {
         "description": textarea
      }, config)
         .then((response) => {
            console.log(response.data);
            dispatch(showSuccess("Contract created"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshContracts(true));
         })
   }

   function onboardVendor(){
      const url = '/vendors/' + vendorID + '/assignment'
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         newServiceContractID: serviceContractNo,
         offboardingVendor: false,
      }, config)
         .then((response) => {
            console.log(response.data);
            dispatch(showSuccess("Vendor onboarded"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshVendors(true));
            dispatch(performRefreshContracts(true));
         })
   }

   function offboardVendor(){
      const url = '/vendors/' + vendorID + '/assignment'
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         contractID: serviceContractNo,
         offboardingVendor: true
      }, config)
         .then((response) => {
            console.log(response.data);
            dispatch(showSuccess("Vendor offboarded"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshVendors(true));
            dispatch(performRefreshContracts(true));
         })
   }

   function changeMapping(){
      const url = '/vendors/' + vendorID + '/assignment'
      const config: AxiosRequestConfig = {
         headers: {
            "USER_ID": props.user.id.toString()
         }
      }
      axios.put(url, {
         newServiceContractID: newContractID,
         offboardingVendor: false,
         contractID: serviceContractNo,
      }, config)
         .then((response) => {
            console.log(response.data);
            dispatch(showSuccess("Vendor remapped successfully"))
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message))
         }).finally(() => {
            setTextarea('');
            dispatch(performRefreshVendors(true));
            dispatch(performRefreshContracts(true));
         })
   }

   function handleActionSubmit() {
      switch(action){
         case "1":
            makeContractActive(); break;
         case "2":
            makeContractInactive(); break;
         case "3":
            createContract(); break;
         case "4":
            onboardVendor(); break;
         case "5":
            offboardVendor(); break;
         case "6":
            changeMapping(); break;
      }
   }

   async function fetchVendors() {
      const url = '/vendors/unassigned';
      const response = await fetch(url);
      setVendors(await response.json());
   }
   async function fetchContracts() {
      const url = '/contracts?ownerId=' + props.user.id;
      const response = await fetch(url);
      setContracts(await response.json());
   }
   useEffect(() => {
      fetchVendors();
      fetchContracts();
   }, [props.user])

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
      <ServiceOwnerSectionWrapper>
         <InfoWrapper>
            <Column>
               <h3>Available vendors</h3>
               <VendorsTable rows={vendors} />
            </Column>
            <Column>
               <h3>Created Contracts</h3>
               <ContractsTable rows={contracts} />
            </Column>
         </InfoWrapper>

         <CreateContractWrapper>
            <FormControl sx={{ minWidth: 220 }} size="small">
               <InputLabel id="demo-simple-select-label">Select Action</InputLabel>
               <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={action}
                  label="Select Action"
                  onChange={handleActionSelected}
                  displayEmpty
                  autoWidth
                  variant='outlined'
               >
                  {options.map((item)=>{
                     return <MenuItem value={item.key}>{item.value}</MenuItem>
                  })}
               </Select>
            </FormControl>


            {(action !== "3" && action !== "0") && <TextField
               type="text"
               id='serviceContractNo'
               onChange={(e) => { setServiceContractNo(parseInt(e.target.value) || 0) }}
               value={serviceContractNo === 0 ? '' : serviceContractNo}
               variant="outlined"
               label="Service Contract Number"
               size="small"
               autoComplete='off'
               placeholder='Enter Service Contract Number'
               sx={{ backgroundColor: '#fff', width: '280px'}}
            />}
            { (action === "4" || action === "6" || action === "5") && <TextField
               type="text"
               id='vendorID'
               onChange={(e) => { setVendorID(parseInt(e.target.value) || 0) }}
               value={vendorID === 0 ? '' : vendorID}
               variant="outlined"
               label="Vendor ID"
               size="small"
               autoComplete='off'
               placeholder='Enter Vendor ID'
               sx={{ backgroundColor: '#fff', width: '280px'}}
            />}

            { (action === "6") && <TextField
               type="text"
               id='newContractID'
               onChange={(e) => { setNewContractID(parseInt(e.target.value) || 0) }}
               value={newContractID === 0 ? '' : newContractID}
               variant="outlined"
               label="New Contract ID"
               size="small"
               autoComplete='off'
               placeholder='Enter New Contract ID'
               sx={{ backgroundColor: '#fff', width: '280px'}}
            />}

            {action === "3" && <TextField
               type="text"
               id='contractDescription'
               onChange={handleChange}
               value={textarea}
               variant="outlined"
               label="Description"
               size="small"
               placeholder='Enter Description of the service contract'
               required={true}
               autoComplete='off'
               sx={{ backgroundColor: '#fff', width: '280px' }}
            />}
            <Button
               onClick={handleActionSubmit}
               variant="contained"
               // sx={{ marginTop: '20px' }}
            >
               Submit
            </Button>
         </CreateContractWrapper>



      </ServiceOwnerSectionWrapper>)
};

export default ServiceOwnerSection;

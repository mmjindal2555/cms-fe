import React, { FC, useEffect, useState } from 'react';
import { VendorSectionWrapper } from './VendorSection.styled';
import { User } from '../Body/Body';
import { Vendor } from '../VendorsTable/VendorsTable';
import axios from 'axios';
import { InfoWrapperVertical } from '../Body/Body.styled';
import { useDispatch } from 'react-redux';
import { showError } from '../../reducers/appState';
import { Typography } from '@mui/material';

interface VendorSectionProps {
   user: User
}


const VendorSection: FC<VendorSectionProps> = (props) => {

   const dispatch = useDispatch();

   const [vendor, setVendor] = useState<Vendor>()

   function fetchVendorDetails() {
      const url = '/vendors?employeeID=' + props.user.id;
      axios.get(url)
         .then((response) => {
            let v = response.data;
            if (v.length > 0)
               setVendor(v[0]);
         })
         .catch((error) => {
            dispatch(showError(error.response.data.message));
            console.log(error);
         })
   }

   useEffect(() => {
      fetchVendorDetails();
   }, [props.user.id])

   return (
      <VendorSectionWrapper>
         <InfoWrapperVertical>
            <Typography variant="h6" gutterBottom>
            <b>Name: </b>{vendor?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
            <b>ID:</b> {'' + vendor?.id}
            </Typography>
            <Typography variant="h6" gutterBottom>
            <b>Employee ID:</b> {'' + (vendor?.employeeID || '-')}
            </Typography>
            <Typography variant="h6" gutterBottom>
            <b>Role:</b> {vendor?.role}
            </Typography>
            <Typography variant="h6" gutterBottom>
            <b>Assigned to Contract:</b> {vendor?.contract}
            </Typography>
            <Typography variant="h6" gutterBottom>
            <b>Start Date:</b> {vendor?.startDate}
            </Typography>
         </InfoWrapperVertical>
      </VendorSectionWrapper>
   )
};

export default VendorSection;

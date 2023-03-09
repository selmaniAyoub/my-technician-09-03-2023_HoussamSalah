import React from 'react';
import { styled } from '@mui/material/styles';
import EditDescription from './Description/EditDescription';
import EditExperience from './Experience/EditExperience';
import EditDiplomes from './Diplome/EditDiplomes';
import EditCertification from './Certification/EditCertification';
import EditPohtosCabinet from './EditPohtosCabinet';

const Container = styled('div')`
    width: 100%;
    max-width: 1260px;
    margin: 30px auto;
`

export default function AdvancedSection({ user }) {
    return (
        <Container>
            <EditDescription user={user} />
            <EditExperience user={user} />
            <EditDiplomes user={user} />
            <EditCertification user={user} />
            <EditPohtosCabinet user={user} />
        </Container>
    )
}

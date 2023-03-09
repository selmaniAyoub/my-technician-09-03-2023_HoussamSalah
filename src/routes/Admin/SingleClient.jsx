import React from 'react';
import { useParams } from "react-router-dom";
import SingleClientComponent from '../../components/Admin/SingleClient/SingleClient';


export default function SingleClient() {
    let { clientId } = useParams();

    return <SingleClientComponent clientId={clientId} />;
}

import React from 'react';
import { useParams } from "react-router-dom";
import SinglePraticienComponent from '../../components/Admin/SingleTechnician/SingleTechnician';


export default function SinglePraticien() {
    let { praticienId } = useParams();

    return <SinglePraticienComponent praticienId={praticienId} />;
}

import React from 'react';
import SingleTechnicianPage from '../../components/Public/SingleTechnicianPage/SingleTechnicianPage';
import { useSearchParams } from "react-router-dom";


export default function SinglePersonnel() {
    let [searchParams] = useSearchParams();
    const docId = searchParams.get("id");

    return (
        <SingleTechnicianPage docId={docId} />
    )
}

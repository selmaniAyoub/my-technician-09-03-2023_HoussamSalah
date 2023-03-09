import React from 'react'
import { Outlet } from "react-router-dom";
import HomeLayout from '../../layouts/HomeLayout'

export default function Personnel() {
    return (
        <HomeLayout>
            <Outlet />
        </HomeLayout>
    )
}

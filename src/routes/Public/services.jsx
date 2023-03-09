import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import Services from '../../components/Public/Services'

export default function services() {
    return (
        <HomeLayout>
            <Services />
            <CopyRightFooter>
                <CopyRightText>All rights reserved. © 2021 - 2022 my-craft techician.com</CopyRightText>
            </CopyRightFooter>
        </HomeLayout>
    )
}

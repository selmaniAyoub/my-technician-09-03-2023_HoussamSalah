import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles'

const Container = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2
`

export default function Loading() {
    return (
        <Container>
            <CircularProgress />
        </Container>
    )
}

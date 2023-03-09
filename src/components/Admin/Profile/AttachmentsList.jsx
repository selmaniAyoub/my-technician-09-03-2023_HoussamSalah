import React from 'react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


const ImgContainer = styled('div')`
    display: flex;
    flex-direction: row;
    max-width: 100%;
    overflow: auto;
    padding: 10px 0;
    margin: 20px 0;
`

const SingleImg = styled('div')`
    position: relative;
`

const ImgThumbnail = styled('div')`
    height: 100px;
    width: 100px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0 15px 0 0;
    border-radius: 5px;
`

const StyledIconButton = styled(IconButton)`
    position: absolute;
    right: 10px;
    top: -14px;
    background-color: #fff !important;
    box-shadow: 0px 0px 9px -1px #b7b7b7;
    &:hover{
            background-color: #fff;
    }
    .eVMIxE.Mui-disabled:{
        background-color: #c1c1c1;
        color: rgb(143 143 143);
    }
`

export default function AttachmentsList({ photos, loading, handeleDeleteFile }) {

    if (!photos || photos.length === 0) {
        return null;
    }

    return (
        <ImgContainer>
            {
                photos.map((p, i) => (
                    <SingleImg key={i}>
                        {
                            typeof p === 'string' ?
                                <ImgThumbnail
                                    style={{
                                        backgroundImage: `url("${p}")`
                                    }}
                                />
                                :
                                null
                                // <ImgThumbnail
                                //     style={{
                                //         backgroundImage: `url("${URL.createObjectURL(p)}")`
                                //     }}
                                // />
                        }
                        <StyledIconButton disabled={loading} onClick={handeleDeleteFile(p)} color="error" aria-label="delete picture" size="small">
                            <DeleteIcon fontSize="small" />
                        </StyledIconButton>
                    </SingleImg>
                ))
            }
        </ImgContainer>
    )
}

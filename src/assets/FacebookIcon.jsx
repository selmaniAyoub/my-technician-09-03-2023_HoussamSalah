import * as React from "react"
import SvgIcon from '@mui/material/SvgIcon';

const SvgComponent = (props) => (
    <SvgIcon xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
        <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm-3 7h-1.924C13.461 7 13 7.252 13 7.889V9h3l-.238 3H13v8h-3v-8H8V9h2V7.077C10 5.055 11.064 4 13.461 4H16v3z" />
    </SvgIcon>
)

export default SvgComponent

import { Box } from '@mui/material'
import React from 'react'
import CustomInput from './CustomInput'
import CustomTextArea from './CustomTextArea'
import CustomSelect from './CustomSelectField'

const CustomField = ({ input, textarea, select, error, label, id, name, type, placeholder, value, onChange, onBlur, ...props }) => {
    return (
        <Box>
            <label htmlFor={id} className='text-sm font-semibold' {...props}>{label}</label>
            {input && (<CustomInput error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props} />)}
            {textarea && (<CustomTextArea error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props} />)}
            {select && (<CustomSelect error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props}> {props.children} </CustomSelect>)}
        </Box>
    )
}

export default CustomField
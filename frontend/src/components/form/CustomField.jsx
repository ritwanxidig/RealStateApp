import { Box } from '@mui/material'
import React from 'react'
import CustomInput from './CustomInput'
import CustomTextArea from './CustomTextArea'
import CustomSelect from './CustomSelectField'
import CustomCheckbox from './CustomCheckbox'

const CustomField = ({ input, textarea, touched, select, checkbox, error, label, id, name, type, placeholder, value, onChange, onBlur, optional, ...props }) => {
    return (
        <Box>
            <label htmlFor={id} className='text-sm font-semibold' {...props}>{label}{optional ? <span className="text-gray-400">(optional)</span> : <span className='text-red-500'>*</span>}</label>
            {input && (<CustomInput error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props} />)}
            {textarea && (<CustomTextArea error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props} />)}
            {select && (<CustomSelect error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props}> {props.children} </CustomSelect>)}
            {checkbox && (<CustomCheckbox error={error} id={id} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} {...props} />)}
            {error && touched && <p className='text-sm text-red-500'>{error}</p>}
        </Box>
    )
}

export default CustomField
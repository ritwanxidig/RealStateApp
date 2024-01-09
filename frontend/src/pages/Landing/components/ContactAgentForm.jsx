import { Box } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast'
import CustomField from 'src/components/form/CustomField'
import StyledButton from 'src/components/shared/StyledButton'
import CustomModal from 'src/views/utilities/CustomModal'
import * as yup from 'yup'



const validations = yup.object().shape({
    subject: yup.string('Enter Subject Message').required('Subject is required'),
    body: yup.string().required('Enter body of your message')
})

const ContactAgentForm = ({ onOpen, setOnOpen, data }) => {
    const formik = useFormik({
        initialValues: {
            subject: '',
            body: ''
        },
        onSubmit: (values) => {
            const emailLink = `mailto:${data?.user?.email}?subject=${values.subject}&body=${values.body}`;
            window.location.href = emailLink;
            setOnOpen(false);
            toast.success("message sent, please complete process in your email app");
        },
        validationSchema: validations
    });

    const { values, handleChange, errors, handleSubmit, touched, handleBlur } = formik;

    const actions = () => (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <StyledButton variant="outlined" onClick={() => setOnOpen(false)} color="error">Cancel</StyledButton>
            <StyledButton variant="contained" onClick={handleSubmit} color="primary">Send</StyledButton>
        </Box>
    )
    return (
        <CustomModal onOpen={onOpen} setOnOpen={setOnOpen} title="Contact Agent" actions={actions()}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CustomField
                    label="Subject"
                    name="subject"
                    id="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                    error={errors.subject}
                    touched={touched.subject}
                    input
                />
                <CustomField
                    label="Body"
                    name="body"
                    id="body"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                    error={errors.body}
                    touched={touched.body}
                    textarea
                />
            </Box>
        </CustomModal>
    )
}

export default ContactAgentForm
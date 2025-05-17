import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import api from '../../server';

const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
});

const AddNote = ({ getNotes }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await api.post('/api/notes', values);
                console.log('Note saved successfully!', response.data);
                formik.resetForm();
                if (getNotes) {
                    getNotes();
                }
            } catch (error) {
                console.error('An error occurred:', error.response?.data || error.message);
            }
        },

    });

    return (
        <Box
            sx={{

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    padding: '20px',
                    gap: '15px',
                    justifyContent: 'center',
                    width: '500px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                }}
            >

                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                    <Typography variant="h6" htmlFor="title">
                        Title
                    </Typography>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        margin="normal"
                    />

                    <Typography variant="h6" htmlFor="content">
                        Description
                    </Typography>
                    <TextField
                        fullWidth
                        id="content"
                        name="content"
                        multiline
                        rows={4}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.content}
                        error={formik.touched.content && Boolean(formik.errors.content)}
                        helperText={formik.touched.content && formik.errors.content}
                        margin="normal"
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ marginTop: '20px', justifyContent: 'center' }}
                    >
                        <Button variant="contained" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Saving...' : 'Submit'}
                        </Button>
                        <Button variant="outlined" onClick={formik.resetForm}>
                            Reset
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>

    );
};

export default AddNote;
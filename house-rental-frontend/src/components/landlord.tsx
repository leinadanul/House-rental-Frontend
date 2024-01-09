import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

export default function FormPropsTextFields() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [companyNumberError, setCompanyNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor | undefined>('success');

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
        setPhoneNumberError(!/^\+?[1-9]\d{1,14}$/.test(value));
    };

    const handleCompanyNumberChange = (value) => {
        setCompanyNumber(value);
        setCompanyNumberError(!/^\+?[1-9]\d{1,14}$/.test(value));
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!firstName || !lastName || !phoneNumber || !email || emailError) {
            handleSnackbarOpen('Please fill in all required fields.', 'warning');
            return;
        }
        try {
            const companyNumberToSend = companyNumber === '' ? null : Number(companyNumber);
            const companyPictureToSend = company === '' ? null : String(company)
            const pictureToSend = picture === '' ? null : String(picture)
            const response = await fetch('http://127.0.0.1:8000/landlord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                    company_number: companyNumberToSend,
                    company_name: companyPictureToSend,
                    picture: pictureToSend,
                }),
            });

        if (!response.ok) {
            throw new Error('Internal Server Error. Unable to register at the moment. Please try again later.');
        } else {
            handleSnackbarOpen('Form submitted successfully!', 'success');
        }
            const data = await response.json();
            console.log('Form submitted:', data);

            setFirstName('');
            setLastName('');
            setPhoneNumber('');
            setCompanyNumber('');
            setEmail('');
            setCompany('');
            setPicture('');
        } catch (error) {
            console.error('Error:', error);
            handleSnackbarOpen('Error submitting form. Please try again later.', 'error');
        }
    };

    const handleSnackbarOpen = (message, severity) => {
        setSnackbarOpen(true);
        setSnackbarMessage(message);
        setSnackbarSeverity(['success', 'error', 'warning', 'info'].includes(severity) ? severity : undefined);
    };
    
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };
    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit} noValidate autoComplete="on">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Paper elevation={3} sx={{ width: '100%', padding: 3, marginTop: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <div style={{display:"flex", flexDirection: "row"  }}>
                        <TextField
                            required
                            id="outlined-first-name"
                            label="First Name"
                            variant="standard"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            required
                            id="outlined-last-name"
                            label="Last Name"
                            variant="standard"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={{ m: 1, width: '48%' }}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "row" }}>
                        <TextField
                            required
                            error={phoneNumberError}
                            id="outlined-number_phone"
                            label="Phone Number"
                            variant="standard"
                            value={phoneNumber}
                            onChange={(e) => handlePhoneNumberChange(e.target.value)}
                            helperText={phoneNumberError ? 'Invalid phone number' : ''}
                            sx={{ m: 1, width: '48%' }}
                        />
                        <TextField
                            required
                            error={emailError}
                            id="outlined-email"
                            label="Email"
                            variant="standard"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            helperText={emailError ? 'Invalid email address' : ''}
                            sx={{ m: 1, width: '48%' }}
                        />
                    </div>
                        <TextField
                            id="outlined-company"
                            label="Company Name (Optional)"
                            variant="standard"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            sx={{ m: 1, width: '100%' }}
                        />
                        <TextField
                            error={companyNumberError}
                            id="outlined-company-number"
                            label="Comapny Number (Optional)"
                            variant="standard"
                            value={companyNumber}
                            onChange={(e) => handleCompanyNumberChange(e.target.value)}
                            helperText={companyNumberError ? 'Invalid company number' : ''}
                            sx={{ m: 1, width: '100%' }}
                        />
                    </Paper>
                    <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                        Submit
                    </Button>
                    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                        <MuiAlert severity={snackbarSeverity} sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </MuiAlert>
                    </Snackbar>
                </Box>
            </form>
        </Container>
    );
}

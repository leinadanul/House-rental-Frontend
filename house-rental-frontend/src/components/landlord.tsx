import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

export default function FormPropsTextFields() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [mobileNumberError, setMobileNumberError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handlePhoneNumberChange = (value) => {
        setPhoneNumber(value);
        setPhoneNumberError(!/^\+?[1-9]\d{1,14}$/.test(value));
    };

    const handleMobileNumberChange = (value) => {
        setMobileNumber(value);
        setMobileNumberError(!/^\+?[1-9]\d{1,14}$/.test(value));
    };

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!firstName || !lastName || !phoneNumber || !email || !company || phoneNumberError || emailError) {
            alert('The form has errors');
            return;
        }

        console.log('Form submitted:', { firstName, lastName, phoneNumber, mobileNumber, email, company });
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setMobileNumber('');
        setEmail('');
        setCompany('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
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
                            required
                            id="outlined-company"
                            label="Company Name"
                            variant="standard"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            sx={{ m: 1, width: '100%' }}
                        />
                        <TextField
                            error={mobileNumberError}
                            id="outlined-mobile-number"
                            label="Comapny Number"
                            variant="standard"
                            value={mobileNumber}
                            onChange={(e) => handleMobileNumberChange(e.target.value)}
                            helperText={mobileNumberError ? 'Invalid mobile number' : ''}
                            sx={{ m: 1, width: '100%' }}
                        />
                    </Paper>
                    <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
}

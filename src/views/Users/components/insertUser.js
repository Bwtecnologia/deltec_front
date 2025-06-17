import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
    Autocomplete,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik } from 'formik';

import InputMask from 'react-input-mask';
import { useState } from 'react';
import { strengthIndicator } from 'utils/password';
import { strengthColor } from 'utils/password-strength';
import { useApi } from 'hooks/useApi';

export function InsertUser({ getUsers }) {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const api = useApi();

    const userRoles = [{ label: 'Administrador', value: 'ADMINISTRATOR' }];

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    async function handleCreateUser(values) {
        const payload = {
            name: values.name,
            phone: values.phone,
            email: values.email,
            role: values.role,
            username: values.username,
            password: values.password
        };
        try {
            const { data } = await api.createUser(payload);
            console.log('🚀 ~ handleCreateUser ~ data:', data);
        } catch (error) {
            console.log('🚀 ~ handleCreateUser ~ error:', error);
        }
    }

    return (
        <>
            <Button variant="contained" onClick={() => setOpen(true)}>
                Adicionar usuário
            </Button>
            <Drawer open={open} onClose={() => setOpen(false)} anchor="right" sx={{ width: 350 }}>
                <Formik
                    initialValues={{
                        name: '',
                        username: '',
                        email: '',
                        role: '',
                        phone: '',
                        password: '',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Nome obrigatorio'),
                        email: Yup.string().email('tem que ser um email valido').max(255).required('Email obrigatorio')
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting, errors }) => {
                        handleCreateUser(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} style={{ padding: '20px', width: '450px' }}>
                            <h3 style={{ textAlign: 'center' }}>Adicionar usuário</h3>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        type="text"
                                        label="Nome"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && Boolean(errors.name)}
                                        helperText={touched.name && errors.name}
                                    />
                                </FormControl>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                    <TextField
                                        sx={{ width: '100%' }}
                                        type="text"
                                        label="E-mail"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </FormControl>

                                <Autocomplete
                                    id="outlined-adornment-role-register"
                                    options={userRoles}
                                    getOptionLabel={(option) => option.label}
                                    value={userRoles.find((role) => role.value === values.role) || null}
                                    onChange={(event, newValue) => {
                                        handleChange({
                                            target: { name: 'role', value: newValue ? newValue.value : '' }
                                        });
                                    }}
                                    onBlur={handleBlur}
                                    renderInput={(params) => <TextField {...params} label="Tipo de usuário" name="role" />}
                                />

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.phone && errors.phone)}
                                    // sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-phone-register">Telefone</InputLabel>
                                    <InputMask mask="(99) 99999-9999" value={values.phone} onBlur={handleBlur} onChange={handleChange}>
                                        {(inputProps) => (
                                            <OutlinedInput
                                                id="outlined-adornment-phone-register"
                                                type="text"
                                                name="phone"
                                                label="Telefone"
                                                {...inputProps}
                                            />
                                        )}
                                    </InputMask>
                                    {touched.phone && errors.phone && (
                                        <FormHelperText id="standard-weight-helper-text--register">{errors.phone}</FormHelperText>
                                    )}
                                </FormControl>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                                        <TextField
                                            sx={{ width: '100%' }}
                                            type="text"
                                            label="Login"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.username && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                                        <InputLabel htmlFor="outlined-adornment-password-register">Senha</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password-register"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            name="password"
                                            label="Senha"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e);
                                                changePassword(e.target.value);
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        size="large"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            inputProps={{}}
                                        />
                                        {touched.password && errors.password && (
                                            <FormHelperText error id="standard-weight-helper-text-password-register">
                                                {errors.password}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                                {strength !== 0 && (
                                    <FormControl sx={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}

                                <Button
                                    // disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Atualizar usuário
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Drawer>
        </>
    );
}

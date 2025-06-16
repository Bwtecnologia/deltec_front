import PropTypes from 'prop-types';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useApi } from 'hooks/useApi';
import { toast } from 'react-toastify';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = ({ loginProp, ...others }) => {
    const api = useApi();
    const theme = useTheme();
    const navigate = useNavigate();

    const { login } = useAuth();
    const scriptedRef = useScriptRef();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    async function getCurrentUser() {
        try {
            const { data } = await api.getMe();
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/main/dashboard');
        } catch (error) {
            console.log('🚀 ~ getCurrentUser ~ error:', error);
        }
    }

    async function handleLogin(user, password) {
        const toastId = toast.loading('Autenticando...');
        try {
            const { data } = await api.signin({ username: user, password });
            localStorage.setItem('token', data?.token);
            console.log('🚀 ~ handleLogin ~ data:', data);
            toast.update(toastId, {
                render: 'Usuário autenticado com sucesso',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
            getCurrentUser();
        } catch (error) {
            console.log('🚀 ~ handleSubmit ~ error:', error);
            toast.update(toastId, {
                render: 'Usuário não autenticado',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    }

    return (
        <Formik
            initialValues={{
                userName: '',
                password: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                userName: Yup.string().max(255).required('Usuário é obrigatório'),
                password: Yup.string().max(255).required('Senha é obrigatória')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                handleLogin(values.userName, values.password);
                // try {
                //     await login(values.email, values.password);

                //     if (scriptedRef.current) {
                //         setStatus({ success: true });
                //         setSubmitting(false);
                //     }
                // } catch (err) {
                //     console.error(err);
                //     if (scriptedRef.current) {
                //         setStatus({ success: false });
                //         setErrors({ submit: err.message });
                //         setSubmitting(false);
                //     }
                // }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.userName && errors.userName)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-login">Usuário</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            value={values.userName}
                            name="userName"
                            placeholder="deltec@gmail.com"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            inputProps={{}}
                        />
                        {touched.userName && errors.userName && (
                            <FormHelperText error id="standard-weight-helper-text-email-login">
                                {errors.userName}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            placeholder="******"
                            onChange={handleChange}
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
                            label="Password"
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button color="primary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                                Entrar
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

JWTLogin.propTypes = {
    loginProp: PropTypes.number
};

export default JWTLogin;

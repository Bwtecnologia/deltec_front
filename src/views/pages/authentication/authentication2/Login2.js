import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper2 from '../AuthWrapper2';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import BackgroundPattern2 from 'ui-component/cards/BackgroundPattern2';
import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthSlider from 'ui-component/cards/AuthSlider';

// assets
// import imgMain from 'assets/images/auth/img-a2-login.svg';

// carousel items
const items = [
    {
        title: 'MISSÃO',
        description: 'Fornecer soluções inovadoras e sustentáveis para tratamento de superfícies e pintura.'
    },
    {
        title: 'VISÃO',
        description: 'Ser a referência em produtos e serviços otimizados e adequados.'
    },
    {
        title: 'VALORES',
        description: 'Respeito e comprometimento, Seriedade,  Valorização dos colaboradores, Ousadia,  Orgulho em ser Deltec'
    }
];

// ================================|| AUTH2 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <AuthWrapper2>
            <Grid container justifyContent={matchDownSM ? 'center' : 'space-between'} alignItems="center">
                <Grid item md={6} lg={7} xs={12} sx={{ minHeight: '100vh' }}>
                    <Grid
                        sx={{ minHeight: '100vh' }}
                        container
                        alignItems={matchDownSM ? 'center' : 'flex-start'}
                        justifyContent={matchDownSM ? 'center' : 'space-between'}
                    >
                        <Grid
                            item
                            xs={12}
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ minHeight: { xs: 'calc(100vh - 68px)', md: 'calc(100vh - 152px)' }, mt: 10 }}
                        >
                            <Stack justifyContent="center" alignItems="center" spacing={1} m={1}>
                                <Box component={Link} to="#">
                                    <Logo width={250} />
                                </Box>
                                <AuthCardWrapper border={matchDownMD}>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item>
                                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                <Typography
                                                    color={theme.palette.secondary.main}
                                                    gutterBottom
                                                    variant={matchDownSM ? 'h3' : 'h2'}
                                                >
                                                    Bem-vindo(a) de volta
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    fontSize="16px"
                                                    textAlign={matchDownSM ? 'center' : 'inherit'}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthLogin loginProp={2} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography
                                                    component={Link}
                                                    to="/pages/register/register2"
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none' }}
                                                >
                                                    Ainda não tem conta ? <span style={{ color: '#018278' }}>Cadastre-se</span>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern2>
                        <Grid item container justifyContent="center">
                            <Grid item xs={12}>
                                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                                    <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                                        <AuthSlider items={items} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} sx={{ position: 'relative' }}>
                                <img
                                    alt="Auth method"
                                    // src={imgMain}
                                    style={{
                                        maxWidth: '100%',
                                        margin: '0 auto',
                                        display: 'block',
                                        width: 300,
                                        position: 'relative',
                                        zIndex: 5
                                    }}
                                />
                            </Grid> */}
                        </Grid>
                    </BackgroundPattern2>
                </Grid>
            </Grid>
        </AuthWrapper2>
    );
};

export default Login;

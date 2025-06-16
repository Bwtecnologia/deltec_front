// material-ui
import { useTheme } from '@mui/material/styles';
import LogoBw from '../assets/logos/deltec.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ width = 100 }) => {
    const theme = useTheme();

    return <img src={theme.palette.mode === 'dark' ? LogoBw : LogoBw} alt="Logo" width={width} />;
};

export default Logo;

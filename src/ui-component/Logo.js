// material-ui
import { useTheme } from '@mui/material/styles';
import LogoDeltec from '../assets/logos/deltec.png';
import LogoLight from '../assets/logos/logo-light.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = ({ width = 180 }) => {
    const theme = useTheme();

    return <img src={theme.palette.mode === 'dark' ? LogoLight : LogoDeltec} alt="Logo" width={width} />;
};

export default Logo;

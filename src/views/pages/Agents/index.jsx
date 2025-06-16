import { Box, Button, Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AgentsModal from './components/AgenstsModal';

export function Agents() {
    return (
        <MainCard title="Agentes" sx={{ position: 'relative' }}>
            <Grid container spacing={gridSpacing}>
                <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
                    <AgentsModal />
                </Box>
            </Grid>
        </MainCard>
    );
}

import { Box, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useApi } from 'hooks/useApi';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

export function Family() {
    const api = useApi();
    const [rows, setRows] = useState([]);

    async function getRows() {
        try {
            const { data } = await api.getAllFamily();
            const rows = data.map((row, index) => ({
                id: index,
                familia: '-',
                cliente: row.AGN_ST_FANTASIA,
                tCrs: row.QTD_CR,
                crs2: '-',
                percent: '-',
                expedicao: '-',
                piorCr: '-',
                qtdSPdc: '-'
            }));
            setRows(rows);
        } catch (error) {
            console.log('🚀 ~ getRows ~ error:', error);
        }
    }

    const columns = [
        { field: 'familia', headerName: 'OS / Família', flex: 1 },
        { field: 'cliente', headerName: 'Cliente', flex: 2 },
        { field: 'tCrs', headerName: 'Total CRs', flex: 1 },
        { field: 'crs2', headerName: 'CRs 2', flex: 1 },
        { field: 'percent', headerName: 'Percentual', flex: 1 },
        { field: 'expedicao', headerName: 'Expedição', flex: 1 },
        { field: 'piorCr', headerName: 'Pior CR', flex: 1 },
        { field: 'qtdSPdc', headerName: 'Qtd S/PDC', flex: 1 }
    ];

    useEffect(() => {
        getRows();
    }, []);

    return (
        <MainCard title="Resumo Famílias">
            <Grid container spacing={gridSpacing}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <DataGrid rows={rows} columns={columns} sx={{ height: 'calc(100vh - 230px)' }} />
                </Box>
            </Grid>
        </MainCard>
    );
}

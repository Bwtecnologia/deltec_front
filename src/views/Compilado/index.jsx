import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconBox, IconShoppingBag } from '@tabler/icons';
import { useApi } from 'hooks/useApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';

export function Compilado() {
    const api = useApi();
    const [rows, setRows] = useState([]);
    const [openSaldoEstoque, setOpenSaldoEstoque] = useState(false);
    const [openCompra, setOpenCompra] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    async function fetchData() {
        const toastId = toast.loading('Carregando dados...');
        try {
            const { data } = await api.getAllCompilado();
            console.log('🚀 ~ fetchData ~ data:', data);
            toast.update(toastId, {
                render: 'Dados carregados com sucesso!',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            });

            setRows(data.map((item, index) => ({ ...item, id: index + 1 })));
        } catch (error) {
            console.log('🚀 ~ fetchData ~ error:', error);
            toast.update(toastId, {
                render: 'Erro ao carregar dados!',
                type: 'error',
                isLoading: false,
                autoClose: 2000
            });
        }
    }

    const columns = [
        { field: 'CODIGO', headerName: 'CR', flex: 0.6 },
        { field: 'DESCRICAO', headerName: 'Descrição', flex: 1 },
        { field: 'PROJETO', headerName: 'Projeto', flex: 1 },
        { field: 'ORDEM', headerName: 'OP', flex: 0.7 },

        { field: 'PICKING', headerName: 'Picking', flex: 0.7 },
        { field: 'STATUS_ORDEM', headerName: 'Status Picking', flex: 1 },
        { field: 'TIPO_ORDEM', headerName: 'Tipo Ordem', flex: 1 },
        {
            field: 'DT_NECESSIDADE',
            headerName: 'Necessidade',
            flex: 1,
            valueGetter: (params) => new Date(params.row.DT_NECESSIDADE).toLocaleDateString('pt-BR')
        },
        { field: 'QTD_NECESSARIA', headerName: 'Qtd', flex: 0.5 },
        { field: 'SALDO', headerName: 'Saldo', flex: 0.5 },
        {
            field: 'acao',
            headerName: 'Ação',
            flex: 0.8,
            renderCell: (params) => (
                <>
                    <Tooltip title="Saldo em estoque">
                        <IconButton
                            onClick={() => {
                                setCurrentRow(params.row);
                                setOpenSaldoEstoque(true);
                            }}
                        >
                            <IconBox />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Pedido de compra">
                        <IconButton
                            onClick={() => {
                                setCurrentRow(params.row);
                                setOpenCompra(true);
                            }}
                        >
                            <IconShoppingBag />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainCard title="Resumo Famílias">
            <Grid container spacing={gridSpacing}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <DataGrid rows={rows} columns={columns} sx={{ height: 'calc(100vh - 230px)' }} getRowHeight={() => 'auto'} />
                </Box>
            </Grid>
        </MainCard>
    );
}

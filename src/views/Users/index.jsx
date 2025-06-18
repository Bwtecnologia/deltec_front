import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { IconTrash, IconUsers } from '@tabler/icons';
import { useApi } from 'hooks/useApi';
import { useEffect, useState, useCallback } from 'react';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import { EditeUser } from './components/EditeUser';
import { InsertUser } from './components/insertUser';
import { toast } from 'react-toastify';

export function Users() {
    const api = useApi();
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const getUsers = useCallback(async () => {
        try {
            const { data } = await api.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.log('🚀 ~ getUsers ~ error:', error);
        }
    }, [api]);

    useEffect(() => {
        getUsers();
    }, []);

    async function handleDeleteUser(id) {
        const toastId = toast.loading('Deletando...');
        try {
            await api.deleteUser(id);
            getUsers();
            toast.update(toastId, {
                render: 'Usuário deletado com sucesso',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (error) {
            toast.update(toastId, {
                render: 'Erro ao deletar usuário',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
            console.log('🚀 ~ handleDeleteUser ~ error:', error);
        }
    }

    const columns = [
        { field: 'name', headerName: 'Nome', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Telefone', flex: 1 },
        { field: 'role', headerName: 'Função', flex: 1 },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 0.6,
            renderCell: (params) => (
                <div>
                    <Tooltip title="Editar">
                        <IconButton
                            onClick={() => {
                                setSelectedUser(params.row);
                                setOpen(true);
                            }}
                        >
                            <IconUsers />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <IconButton onClick={() => handleDeleteUser(params.row.id)}>
                            <IconTrash />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    ];

    return (
        <MainCard title="Usuários" secondary={<InsertUser getUsers={getUsers} />}>
            <Grid container spacing={gridSpacing}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <DataGrid
                        rows={users}
                        columns={columns}
                        sx={{
                            height: 'calc(100vh - 230px)'
                        }}
                    />
                </Box>
            </Grid>
            <EditeUser open={open} setOpen={setOpen} currentUser={selectedUser} getUsers={getUsers} />
        </MainCard>
    );
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Checkbox, Divider, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PatternFormat } from 'react-number-format';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: 5,
    sm: 600,
    md: 800,
    lg: 1000,
    xl: 1200,
    maxWidth: '700px'
};

export default function AgentsModal() {
    const api = useApi();
    /**
     * State para modal
     */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    /**
     * Configuração do Formik
     */

    async function handleCreateAgent(values) {
        const payload = {
            cliente: values.cliente,
            fornecedor: values.fornecedor,
            colaborador: values.colaborador,
            name: values.nome,
            cpf_cnpj: values.cpfCnpj,
            cep: values.cep,
            endereco: values.endereco,
            numero: values.numero,
            uf: values.uf,
            cidade: values.cidade,
            bairro: values.bairro,
            complemento: values.complemento,
            email: values.email,
            contato: values.contato,
            cargo: values.cargo,
            telefone_comercial: values.telefoneComercial,
            telefone_celular: values.smartphone,
            observacoes: values.observacoes
        };

        const toastId = toast.loading('Cadastrando agente...');

        try {
            await api.createAgent(payload);
            handleClose();
            toast.update(toastId, {
                render: 'Agente cadastrado com sucesso!',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (error) {
            console.log('🚀 ~ handleCreateAgent ~ error:', error);
            toast.update(toastId, {
                render: 'Erro ao cadastrar agente!',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            nome: '',
            cpfCnpj: '',
            cliente: false,
            fornecedor: false,
            colaborador: false,
            cep: '',
            bairro: '',
            cidade: '',
            uf: '',
            numero: '',
            complemento: '',
            logradouro: '',
            endereco: '',
            contato: '',
            email: '',
            observacoes: '',
            smartphone: '',
            telefoneComercial: '',
            cargo: ''
        },
        validationSchema: Yup.object({
            nome: Yup.string().required('Nome é obrigatório'),
            cpfCnpj: Yup.string().required('CPF/CNPJ é obrigatório'),
            email: Yup.string().email('Email inválido').required('Email é obrigatório')
        }),
        onSubmit: (values) => {
            handleCreateAgent(values);
        }
    });

    /**
     * Funções
     */

    async function getAddressByCep() {
        const toastId = toast.loading('Buscando endereço...');

        try {
            const { data } = await axios.get(`https://viacep.com.br/ws/${formik.values.cep}/json/`);

            formik.setFieldValue('endereco', data.logradouro || '');
            formik.setFieldValue('bairro', data.bairro || '');
            formik.setFieldValue('cidade', data.localidade || '');
            formik.setFieldValue('uf', data.uf || '');

            toast.update(toastId, {
                render: 'Endereço encontrado!',
                type: 'success',
                isLoading: false,
                autoClose: 3000
            });
        } catch (error) {
            console.log('🚀 ~ getAddressByCep ~ error:', error);
            toast.update(toastId, {
                render: 'CEP não encontrado!',
                type: 'error',
                isLoading: false,
                autoClose: 3000
            });
        }
    }

    useEffect(() => {
        if (!formik.values.cep || formik.values.cep.length !== 8) return;

        getAddressByCep();
    }, [formik.values.cep]);
    return (
        <div>
            <Button onClick={handleOpen} variant="contained">
                Novo agente
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <h2 style={{ textAlign: 'center' }}>Novo Cadastro</h2>

                    <form onSubmit={formik.handleSubmit} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <Divider sx={{ margin: '10px 0' }}>Dados gerais</Divider>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Checkboxes */}
                            <FormGroup sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <FormControlLabel
                                    control={<Checkbox name="cliente" checked={formik.values.cliente} onChange={formik.handleChange} />}
                                    label="Cliente"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox name="fornecedor" checked={formik.values.fornecedor} onChange={formik.handleChange} />
                                    }
                                    label="Fornecedor"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox name="colaborador" checked={formik.values.colaborador} onChange={formik.handleChange} />
                                    }
                                    label="Colaborador"
                                />
                            </FormGroup>

                            {/* Campos de texto */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    id="nome"
                                    name="nome"
                                    label="Nome"
                                    variant="outlined"
                                    value={formik.values.nome}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nome && Boolean(formik.errors.nome)}
                                    helperText={formik.touched.nome && formik.errors.nome}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                                <TextField
                                    id="cpfCnpj"
                                    name="cpfCnpj"
                                    label="CPF/CNPJ"
                                    variant="outlined"
                                    value={formik.values.cpfCnpj}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.cpfCnpj && Boolean(formik.errors.cpfCnpj)}
                                    helperText={formik.touched.cpfCnpj && formik.errors.cpfCnpj}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                            </Box>

                            {/* Campos de endereço */}

                            <Divider sx={{ margin: '5px 0' }}>Endereço</Divider>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    id="cep"
                                    name="cep"
                                    label="CEP"
                                    variant="outlined"
                                    value={formik.values.cep}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '130px' }}
                                />
                                <TextField
                                    id="addres"
                                    name="endereco"
                                    label="Endereço"
                                    variant="outlined"
                                    value={formik.values.endereco}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                                <TextField
                                    id="numero"
                                    name="numero"
                                    label="Número"
                                    variant="outlined"
                                    value={formik.values.numero}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '130px' }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    id="uf"
                                    name="uf"
                                    label="UF"
                                    variant="outlined"
                                    value={formik.values.uf}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '70px' }}
                                />
                                <TextField
                                    id="telcomerce"
                                    name="cidade"
                                    label="Cidade"
                                    variant="outlined"
                                    value={formik.values.cidade}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '200px' }}
                                />
                                <TextField
                                    id="bairro"
                                    name="bairro"
                                    label="Bairro"
                                    variant="outlined"
                                    value={formik.values.bairro}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '200px' }}
                                />
                                <TextField
                                    id="complemento"
                                    name="complemento"
                                    label="Complemento"
                                    variant="outlined"
                                    value={formik.values.complemento}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '130px' }}
                                />
                            </Box>

                            <Divider sx={{ margin: '10px 0' }}>Informações adicionais</Divider>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="E-mail"
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                                <TextField
                                    id="contato"
                                    name="contato"
                                    label="Contato"
                                    variant="outlined"
                                    value={formik.values.contato}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <TextField
                                    id="cargo"
                                    name="cargo"
                                    label="Cargo"
                                    variant="outlined"
                                    value={formik.values.cargo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '130px' }}
                                />

                                <PatternFormat
                                    format="(##) #####-####"
                                    mask="_"
                                    fullWidth
                                    customInput={TextField}
                                    id="telcomerce"
                                    name="telcomerce"
                                    label="Telefone Comercial"
                                    variant="outlined"
                                    value={formik.values.telcomerce}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                                <PatternFormat
                                    format="(##) #####-####"
                                    mask="_"
                                    fullWidth
                                    customInput={TextField}
                                    id="smartphone"
                                    name="smartphone"
                                    label="Telefone Celular"
                                    variant="outlined"
                                    value={formik.values.smartphone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    sx={{ flex: 1, minWidth: '230px' }}
                                />
                            </Box>

                            <Divider sx={{ margin: '10px 0' }}>Observações gerais</Divider>

                            <TextField
                                id="observacoes"
                                name="observacoes"
                                label="Observações"
                                variant="outlined"
                                value={formik.values.observacoes}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{ flex: 1 }}
                                multiline
                                rows={2}
                            />

                            {/* Botão de envio */}
                            <Button type="submit" variant="contained" fullWidth>
                                Cadastrar
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

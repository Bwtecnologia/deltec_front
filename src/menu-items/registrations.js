import { IconUserCircle } from '@tabler/icons';

const registrations = {
    id: 'lobby',
    title: 'Recepção',
    type: 'group',
    children: [
        {
            id: 'agents',
            title: 'Agentes',
            type: 'item',
            url: '/main/agentes',
            icon: IconUserCircle,
            breadcrumbs: false
        }
    ]
};

export default registrations;

import { IconUserCircle } from '@tabler/icons';

const registrations = {
    id: 'lobby',
    title: 'Suprimentos',
    type: 'group',
    children: [
        {
            id: 'agents',
            title: 'Resumo Famílias',
            type: 'item',
            url: '/main/resumo-familias',
            icon: IconUserCircle,
            breadcrumbs: false
        }
    ]
};

export default registrations;

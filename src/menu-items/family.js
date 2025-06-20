import { IconUserCircle, IconComponents } from '@tabler/icons';

const registrations = {
    id: 'lobby',
    title: 'Suprimentos',
    type: 'group',
    children: [
        {
            id: 'Resumo',
            title: 'Resumo Famílias',
            type: 'item',
            url: '/main/resumo-familias',
            icon: IconUserCircle,
            breadcrumbs: false
        },
        {
            id: 'compilado',
            title: 'Compilado',
            type: 'item',
            url: '/main/compilado',
            icon: IconComponents,
            breadcrumbs: false
        }
    ]
};

export default registrations;

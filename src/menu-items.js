export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home',
                },
                {
                    id: 'account',
                    title: 'Account',
                    type: 'item',
                    url: '/account',
                    icon: 'feather icon-user',
                }
            ]
        },
    ]
}


export const Routes=[
    {
        to: '/Products',
        className: 'nav-link MenuItem',
        activeClassName: 'active',
        icon: 'fas fa-warehouse',
        title: 'Productos'
    },
    {
        to: '/ProductMovements',
        className: 'nav-link MenuItem',
        activeClassName: 'active',
        icon: 'fas fa-exchange-alt',
        title: 'Movimientos'
    }
]


export const UserMenuRoutes=[
    {
        to: '/UserProfile',
        ClassName: 'dropdown-item',
        icon: 'fas fa-user',
        title: 'Perfil'
    },
    {
        to: '/LoginOut',
        ClassName: 'dropdown-item',
        icon: 'fas fa-sign-out-alt',
        title: 'Cerrar Cesión'
    }
]
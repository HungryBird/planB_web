export default [
    {
        path: '/user',
        name: 'User',
        component: () => import('@/pages/User/index'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/WarehouseManage',
        name: 'WarehouseManage',
        component: () => import('@/pages/WarehouseManage/index'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/GoodsManage',
        name: 'GoodsManage',
        component: () => import('@/pages/GoodsManage/index'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/RoleManage',
        name: 'RoleManage',
        component: () => import('@/pages/RoleManage/index')
    },
]
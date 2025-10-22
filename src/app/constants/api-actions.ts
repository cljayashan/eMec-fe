export const API_ACTIONS = {
    AUTHENTICATE: 'authenticate',
    LIST: 'list',
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view',
    DELETE: 'delete'
} as const;

export type AuthAction = typeof API_ACTIONS[keyof typeof API_ACTIONS];
export enum UserRole {
    USER = 'USER',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

export interface IUser {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
}

export interface UserSchema {
    authData?: IUser;
    _inited: boolean;
}

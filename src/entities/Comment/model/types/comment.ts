import { IUser } from 'entities/User';

export interface IComment {
    id: string;
    user: IUser;
    body: string;
}

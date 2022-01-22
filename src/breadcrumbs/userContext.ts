import { createContext } from "react";

export interface IUser {
    id: number;
    name: string;
    email: string;
}
export interface IUserContext {
    user?: IUser;
    setUser: (user: IUser) => void;
}
export const UserContext = createContext<IUserContext>({
    user: undefined,
    setUser: () => { },
});

import { createContext } from 'react';
import { IUserContext } from '../types';

export const UserContext = createContext<IUserContext>({
    user: { memberId: null },
    setUser: () => {},
});

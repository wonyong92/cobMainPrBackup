import { createContext } from 'react';
import { IUserContext } from '../types';

export const UserContext = createContext<IUserContext>({
    user: {
        memberId: 0,
        loginId: '',
        email: '',
        name: '',
        nickname: '',
        createdAt: '',
        profileImageId: 0,
    },
    setUser: () => {},
});

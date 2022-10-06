import { createContext } from 'react';
import { IUserContext } from '../types';
import { ISearchResultContext } from '../types';
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

export const SearchResultContext = createContext<ISearchResultContext>({
  searchResultList: [
    {
      catergory: '',
      image: '',
      location: '',
      rentPostContents: '',
      rentPostId: 0,
      rentPostImages: [0],
      rentPostName: '',
      rentPrice: 0,
      rentStatus: true,
      updateDate: '',
      viewCount: 0,
      writeDate: '',
      writerId: 0,
    },
  ],
  setSearchResultList: () => [],
});

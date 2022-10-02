import React, { useState } from 'react';
import { IPostItemData } from '../types';
import { SearchResultContext } from '../context/context';
import MenuModal from '../components/Modal/MenuModal';
import SearchBar from '../components/Search/SearchBar';
import Search from '../pages/Search/Search';
export const SearchReasultCustom: React.FC = () => {
  const [searchResultList, setSearchResultList] = useState<IPostItemData[]>([]);
  return (
    <SearchResultContext.Provider value={{ searchResultList, setSearchResultList }}>
      <MenuModal
        setMenuModal={function (state: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
      <SearchBar
        keyword={''}
        setKeyword={function (state: string): void {
          throw new Error('Function not implemented.');
        }}
      />
      <Search />
    </SearchResultContext.Provider>
  );
};

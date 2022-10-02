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
      <MenuModal />
      <SearchBar />
      <Search />
    </SearchResultContext.Provider>
  );
};

// -------- 검색결과, IPostItemData는 PostItem.tsx 것을 일단 복붙함
export interface IListItemData {
  catergory: string | undefined;
  image: string | undefined;
  location: string | undefined;
  rentPostContents: string | undefined;
  rentPostId: number | undefined;
  rentPostName: string | undefined;
  rentPostImages: number[] | undefined;
  rentPrice: number | undefined;
  rentStatus: boolean | undefined;
  updateDate: string | undefined;
  viewCount: number | undefined;
  writeDate: string | undefined;
  writerId: number | undefined;
}

export interface ISearchResultContext {
  searchResultList: IListItemData[];
  setSearchResultList: React.Dispatch<React.SetStateAction<IListItemData[]>>;
}

import AxiosInstance from '../AxiosInstance';
//게시글제목 검색
export const searchkeyword = async (keyword: string) => {
  const res = await AxiosInstance.post(
    `rentPost/search?phrase=${keyword}&rentStatus=false&sort=writeDate&size=12&page=0`,
  );
  try {
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};

//게시글제목 - 필터선택
export const handleFilterForKeywordSearch = async (
  keyword: string,
  sortType: string,
  rentSortType: string,
  page: number,
) => {
  const res = await AxiosInstance.post(
    `rentPost/search?phrase=${keyword}&rentStatus=${rentSortType}&sort=${sortType}&size=12&page=${page}`,
  );
  try {
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//카테고리검색
export const searchCategoryKeyword = async (targetCategory: string) => {
  const res = await AxiosInstance.get(
    `rentPost/posts?category=category${targetCategory}&rentStatus=false&sort=writeDate&size=12&page=0`,
  );
  try {
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//카테고리검색 - 검색결과 - 필터선택
export const handleFilterForCategorySearch = async (
  sortType: string,
  page: number,
  category: string,
  rentSortType: string,
) => {
  const res = await AxiosInstance.get(
    `rentPost/posts?category=category${category}&rentStatus=${rentSortType}&sort=${sortType}&size=12&page=${page}`,
  );
  try {
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};

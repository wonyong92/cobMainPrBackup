const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
import AxiosInstance from '../AxiosInstance';
//게시글제목 검색
export const searchkeyword = async (keyword: string) => {
  try {
    const res = await AxiosInstance.post(
      `${PROXY}/rentPost/search?phrase=${keyword}&rentStatus=false&sort=writeDate&size=12&page=0`,
    );
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
  try {
    const res = await AxiosInstance.post(
      `${PROXY}/rentPost/search?phrase=${keyword}&rentStatus=${rentSortType}&sort=${sortType}&size=12&page=${page}`,
    );
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//카테고리검색
export const searchCategoryKeyword = async (targetCategory: string) => {
  try {
    const res = await AxiosInstance.get(
      `${PROXY}/rentPost/posts?category=category${targetCategory}&rentStatus=false&sort=writeDate&size=12&page=0`,
    );
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
  try {
    const res = await AxiosInstance.get(
      `${PROXY}/rentPost/posts?category=category${category}&rentStatus=${rentSortType}&sort=${sortType}&size=12&page=${page}`,
    );
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};

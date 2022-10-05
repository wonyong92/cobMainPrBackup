import AxiosInstance from '../AxiosInstance';
//게시글제목 검색
export const searchkeyword = async (keyword: string, data: {}) => {
  const res = await AxiosInstance.post(`rentPost/search?phrase=${keyword}`, data);
  try {
    return res;
  } catch (err) {
    console.log(err);
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
// export const searchkeyword = async (
//   keyword: string,
//   page: number,
//   sortType: string,
//   rentSortType?: string,
// ) => {
//   const data = {
//     sort: sortType,
//     page: page - 1,
//     size: 10,
//   };
//   const res = await AxiosInstance.post(`rentPost/search?phrase=${keyword}`, data);
//   try {
//     return res;
//   } catch {
//     alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
//   }
// };
//게시글제목 - 필터선택
export const handleFilterForKeywordSearch = async (keyword: string, rentSortType: string, data: {}) => {
  // console.log(keyword, rentSortType);
  const res = await AxiosInstance.post(`rentPost/search?phrase=${keyword}&rentStatus=${rentSortType}`, data);
  try {
    // console.log(res);
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//카테고리검색
export const searchCategoryKeyword = async (targetCategory: string) => {
  const res = await AxiosInstance.get(
    `rentPost/posts?category=${targetCategory}&rentStatus=false&sort=writeDate&size=10&page=0`,
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
    `rentPost/posts?category=${category}&rentStatus=${rentSortType}&sort=${sortType}&size=10&page=${page}`,
  );
  try {
    return res;
  } catch {
    alert('요청하신 정보를 불러올 수 없습니다. 잠시후 다시 시도해주세요 ㅜ_ㅜ');
  }
};

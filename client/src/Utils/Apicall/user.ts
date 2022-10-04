import AxiosInstance from '../AxiosInstance';
//프로필이미지변경
export const changeProfileImage = async (formData: {}, config: {}) => {
  const res = await AxiosInstance.post(`http://3.35.90.143:54130/member/profileImage/post`, formData, config);
  try {
    return res.status;
  } catch {
    alert('이미지 변경에 실패했습니다. 다시 시도해주세요 ㅜ_ㅜ');
  }
};
export const changeNickname = async (data: any) => {
  console.log(data);
  const res = await AxiosInstance.put(`http://3.35.90.143:54130/member/profile`, data);
  try {
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
    alert('닉네임 변경에 실패했습니다. 다시 시도해주세요 ㅜ_ㅜ');
  }
};

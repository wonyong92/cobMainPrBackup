const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
import AxiosInstance from '../AxiosInstance';
//프로필이미지
export const changeProfileImage = async (formData: {}, config: {}) => {
  try {
    const res = await AxiosInstance.post(`${PROXY}/member/profileImage/post`, formData, config);
    return res.status;
  } catch {
    alert('이미지 변경에 실패했습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//닉네임
export const changeNickname = async (data: any) => {
  try {
    const res = await AxiosInstance.put(`${PROXY}/member/profile`, data);
    return res.data;
  } catch {
    alert('닉네임 변경에 실패했습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//비밀번호변경
export const changePassword = async (password: string) => {
  try {
    const res = await AxiosInstance.put(`${PROXY}/member/password`, { newPassword: password });
    return res.status;
  } catch {
    alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//회원탈퇴(자체아이디)
export const deleteUserAccount = async () => {
  try {
    const res = await AxiosInstance.delete(`${PROXY}/member/delete`);
    return res.status;
  } catch {
    alert('회원탈퇴 요청을 실패했습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
  }
};
//활동내역
export const getMyAllActivity = async () => {
  try {
    const res = await AxiosInstance.get(`${PROXY}/member/rentPosts`);
    return res.data;
  } catch {
    alert('지금은 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
  }
};

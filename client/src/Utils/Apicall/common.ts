import { DecodeJWT } from '../decodeJWT';
import AxiosInstance from '../AxiosInstance';
//로그인
export const trySignIn = async (loginInfo: {}) => {
  const res = await AxiosInstance.post(`login`, loginInfo, {
    withCredentials: false,
  });
  try {
    const token = res.headers.authorization; // 토큰
    AxiosInstance.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
    const result = DecodeJWT(token); // 유저정보
    delete result.sub;
    delete result.exp;
    return result;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
//회원가입
export const trySignUp = async (userInfo: {}) => {
  const res = await AxiosInstance.post(`member/post`, userInfo, {
    withCredentials: false,
  });
  try {
    return res.status;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
// 중복체크
export const checkDuplicatedLoginId = async (loginId: string) => {
  const res = await AxiosInstance.get(`member/checkExistId?id=${loginId}`, {
    withCredentials: false,
  });
  try {
    return res.data;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
export const checkDuplicatedNickname = async (nickname: string | undefined) => {
  const res = await AxiosInstance.get(`member/checkExistNickname?nickname=${nickname}`, {
    withCredentials: false,
  });
  try {
    return res.data;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
export const checkDuplicatedEmail = async (email: string) => {
  const res = await AxiosInstance.get(`member/checkExistEmail?email=${email}`, {
    withCredentials: false,
  });
  try {
    return res.data;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
// id찾기
export const findUserId = async (userInfo: {}) => {
  const res = await AxiosInstance.post(`member/findId`, userInfo, {
    withCredentials: false,
  });
  try {
    return res.data;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};
// pw찾기
export const findUserPassword = async (userInfo: {}) => {
  const res = await AxiosInstance.post(`member/findPassword`, userInfo, {
    withCredentials: false,
  });
  try {
    return res.data;
  } catch {
    alert('죄송합니다. 잠시 후 다시 시도해주세요');
  }
};

import styled from 'styled-components';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

export interface ILogin {
  loginId: string;
  password: string;
}
const LoginInput = () => {
  const { setUser, user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<ILogin>({
    loginId: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>();
  const handleLoginInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };
  // JWT 디코딩 - utils
  const DecodeJWT = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  };
  // 로그인
  const trySignIn = async () => {
    if (!loginInfo.loginId || !loginInfo.password) {
      setErrorMsg('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const res = await axios.post(`http://3.35.90.143:54130/login`, loginInfo, {
        withCredentials: false,
      });
      // 토큰
      const token = res.headers.authorization;
      axios.defaults.headers.common['Authorization'] = token;
      // 유저정보
      const result = DecodeJWT(token);
      delete result.sub;
      delete result.exp;
      setUser({ ...user, ...result });
      localStorage.setItem('userInfo', JSON.stringify(result));
      navigate('/');
    } catch {
      setErrorMsg('아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <LoginBox>
      <form>
        <DefaultInput
          name="loginId"
          value={loginInfo.loginId}
          onChange={handleLoginInfoChange}
          placeholder="아이디"
        />
        <DefaultInput
          type="password"
          name="password"
          value={loginInfo.password}
          onChange={handleLoginInfoChange}
          placeholder="비밀번호"
        />
      </form>
      <p>{errorMsg}</p>
      <Button text={'로그인'} type={'beige'} onClick={trySignIn} />
    </LoginBox>
  );
};
export default LoginInput;
const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  button {
    margin-top: 10px;
    width: 100%;
  }
  p {
    font-size: 12px;
    color: #ff7f7f;
  }
`;

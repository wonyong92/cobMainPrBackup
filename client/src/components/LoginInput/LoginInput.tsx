import styled from 'styled-components';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import React, { ChangeEvent, useState } from 'react';
import { trySignIn } from '../../Utils';
import { UserContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
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

  const handleSubmitUserIdPW = async () => {
    if (!loginInfo.loginId || !loginInfo.password) {
      setErrorMsg('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    try {
      const result = await trySignIn(loginInfo);
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
      <Button text={'로그인'} type={'beige'} onClick={handleSubmitUserIdPW} />
    </LoginBox>
  );
};
export default LoginInput;

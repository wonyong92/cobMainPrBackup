import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import FindUserInfo from '../../components/FindUserInfo/FindUserInfo';
import { findUserPassword } from '../../Utils';

export interface IFindId {
  email: string;
  loginId: string;
  name: string;
}

const FindPassword = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [userInfo, setUserInfo] = useState<IFindId>({
    email: '',
    loginId: '',
    name: '',
  });
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const foundPassword = async () => {
    const res = await findUserPassword(userInfo);
    try {
      return res.data;
    } catch {
      setErrorMsg('올바른 정보를 입력해주세요.');
    }
  };
  const moveToGuide = (result: string) => {
    return navigate('/findguide', {
      state: { password: result },
    });
  };
  const getPassword = async () => {
    if (!userInfo.email || !userInfo.name || !userInfo.loginId) {
      setErrorMsg('아이디와 이메일, 이름을 입력해주세요.');
      return;
    }
    const result = await foundPassword();
    if (result) {
      moveToGuide(result);
    } else {
      return;
    }
  };
  return (
    <>
      <FindUserInfo
        isPassword={isPassword}
        setisPassword={setIsPassword}
        {...userInfo}
        onChange={handleUserInfoChange}
        errorMsg={errorMsg}
        onClick={getPassword}
      />
    </>
  );
};
export default FindPassword;

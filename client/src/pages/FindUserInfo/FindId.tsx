import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindUserInfo from '../../components/FindUserInfo/FindUserInfo';
import { findUserId } from '../../Utils';

export interface IFindId {
  email: string;
  name: string;
}
const FindId = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [userInfo, setUserInfo] = useState<IFindId>({
    email: '',
    name: '',
  });
  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const sendUserInfo = async () => {
    const result = await findUserId(userInfo);
    try {
      return result;
    } catch {
      setErrorMsg('아이디 찾기에 실패했습니다.');
    }
  };
  const moveToGuide = (result: string) => {
    return navigate('/findguide', {
      state: { loginId: result },
    });
  };
  const getUserId = async () => {
    if (!userInfo.email || !userInfo.name) {
      setErrorMsg('이메일과 이름을 입력해주세요.');
      return;
    }
    const result = await sendUserInfo();
    if (result) {
      moveToGuide(result);
    } else {
      return;
    }
  };

  return (
    <>
      <FindUserInfo {...userInfo} onChange={handleUserInfoChange} errorMsg={errorMsg} onClick={getUserId} />
    </>
  );
};
export default FindId;

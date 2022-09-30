import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindUserInfo from '../../components/FindUserInfo/FindUserInfo';

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
  const foundId = async () => {
    if (!userInfo.email || !userInfo.name) {
      setErrorMsg('이메일과 이름을 입력해주세요.');
      return;
    }
    try {
      const res = await axios.post(`http://3.35.90.143:54130/member/findId`, userInfo, {
        withCredentials: false,
      });
      return res.data;
    } catch {
      setErrorMsg('아이디 찾기에 실패했습니다.');
    }
  };
  const moveToGuide = (result: string) => {
    return navigate('/findguide', {
      state: { loginId: result },
    });
  };
  const getId = async () => {
    const result = await foundId();
    {
      result ? moveToGuide(result) : null;
    }
  };

  return (
    <>
      <FindUserInfo {...userInfo} onChange={handleUserInfoChange} errorMsg={errorMsg} onClick={getId} />
    </>
  );
};
export default FindId;

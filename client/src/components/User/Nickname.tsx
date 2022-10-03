import { ChangeEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/context';
import { NicknameWrapper, BtnWrapper } from './nickname-style';
import Button from '../../UI/button/Button';
import DefaultInput from '../../UI/input/DefaultInput';
import axios from 'axios';
import { MSG_02, MSG_12, MSG_11, MSG_14, NICKNAME_REGEXP } from '../../constants';
interface Message {
  nickname: string;
}
const Nickname = () => {
  const { user, setUser } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const [nickname, setNickname] = useState(user.nickname);
  const [message, setMessage] = useState<Message>({
    nickname: '>',
  });
  const handleNicknameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    {
      isValidNickname(e.target.value)
        ? setMessage({ ...message, ['nickname']: '>' })
        : setMessage({ ...message, ['nickname']: MSG_11 });
    }
  };
  const isValidNickname = (str: string) => {
    return NICKNAME_REGEXP.test(str);
  };
  // 중복검사
  const isDuplicatedNickname = async () => {
    try {
      const res = await axios.get(
        `http://3.35.90.143:54130/member/checkExistNickname?nickname=${nickname}`,
        {
          withCredentials: false,
        },
      );
      const data = res.data;
      return data === 'exist' ? false : true;
    } catch {
      setMessage({ ...message, ['nickname']: MSG_14 });
    }
  };
  const updateLocalStorage = () => {
    return localStorage.setItem('userInfo', JSON.stringify(user));
  };
  const checkIfValidNickname = async (result: any) => {
    if (!nickname || !isValidNickname(nickname)) {
      setMessage({ ...message, ['nickname']: MSG_11 });
      return;
    } else if (!result) {
      setMessage({ ...message, ['nickname']: MSG_12 });
      return;
    } else {
      return true;
    }
  };
  const changeNickname = async () => {
    const result = await isDuplicatedNickname();
    const isValidNickname = checkIfValidNickname(result);
    if ((await isValidNickname) && token) {
      const data = {
        memberId: user.memberId,
        nickname,
      };
      try {
        const res = await axios.put(`http://3.35.90.143:54130/member/profile`, data, {
          headers: { Authorization: token },
        });
        setNickname(res.data.nickname);
        setUser({ ...user, nickname: res.data.nickname });
        setMessage({
          ...message,
          ['nickname']: `닉네임이 ${res.data.nickname} (으)로 변경되었습니다 :)`,
        });
      } catch {
        setMessage({ ...message, ['nickname']: `다시 시도해주세요-!` });
      }
    } else {
      return;
    }
  };
  updateLocalStorage();
  const handleCancleButton = () => {
    setNickname(user.nickname);
  };
  return (
    <NicknameWrapper>
      <div className="title">닉네임</div>
      <DefaultInput
        name={'nickname'}
        value={nickname}
        onChange={handleNicknameInputChange}
        placeholder={MSG_11}
        message={message.nickname}
      ></DefaultInput>
      <BtnWrapper>
        <Button onClick={changeNickname} type={'white'} width={'short'} text={'변경'}></Button>
        <Button onClick={handleCancleButton} type={'white'} width={'short'} text={'취소'}></Button>
      </BtnWrapper>
    </NicknameWrapper>
  );
};
export default Nickname;
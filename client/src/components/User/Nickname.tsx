import { ChangeEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/context';
import { NicknameWrapper, BtnWrapper } from './nickname-style';
import Button from '../../UI/button/Button';
import DefaultInput from '../../UI/input/DefaultInput';
import { MSG_12, MSG_11, MSG_14, NICKNAME_REGEXP } from '../../constants';
import { changeNickname, checkDuplicatedNickname } from '../../Utils';
interface Message {
  nickname: string;
}
const Nickname = () => {
  const { user, setUser } = useContext(UserContext);

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
  const DuplicatedNickname = async () => {
    const res = await checkDuplicatedNickname(nickname);
    try {
      if (res === 'exist') {
        setMessage({ ...message, ['nickname']: MSG_12 });
        return;
      } else {
        return true;
      }
    } catch {
      setMessage({ ...message, ['nickname']: '죄송합니다. 잠시 후 다시 시도해주세요.' });
    }
  };
  const updateLocalStorage = () => {
    return localStorage.setItem('userInfo', JSON.stringify(user));
  };

  const handleSubmitNickname = async () => {
    const result = await DuplicatedNickname();
    if (result) {
      const data = {
        memberId: user.memberId,
        nickname,
      };
      const result = await changeNickname(data);
      console.log(result);
      try {
        setNickname(result.nickname);
        setUser({ ...user, nickname: result.nickname });
        setMessage({
          ...message,
          ['nickname']: `닉네임이 ${result.nickname} (으)로 변경되었습니다 :)`,
        });
      } catch {
        setMessage({ ...message, ['nickname']: `죄송합니다 잠시 후 다시 시도해주세요` });
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
        <Button onClick={handleSubmitNickname} type={'white'} width={'short'} text={'변경'}></Button>
        <Button onClick={handleCancleButton} type={'white'} width={'short'} text={'취소'}></Button>
      </BtnWrapper>
    </NicknameWrapper>
  );
};
export default Nickname;

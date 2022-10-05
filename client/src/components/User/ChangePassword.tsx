import styled from 'styled-components';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/context';
import { BtnWrapper } from './nickname-style';
import { PW_REGEXP, MSG_06, MSG_07, MSG_08, MSG_09 } from '../../constants';
import { changePassword } from '../../Utils';
interface IPassword {
  newPassword: string;
  reNewPassword: string;
}
interface Message {
  newPassword: string;
  reNewPassword: string;
}
const ChangePassword = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const token = localStorage.getItem('token');
  const [password, setPassword] = useState<IPassword>({
    newPassword: '',
    reNewPassword: '',
  });
  const [message, setMessage] = useState<Message>({
    newPassword: '>',
    reNewPassword: '>',
  });
  const isValidPW = (str: string) => {
    return PW_REGEXP.test(str);
  };
  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
    switch (name) {
      case 'newPassword':
        isValidPW(value)
          ? setMessage({ ...message, ['newPassword']: MSG_07 })
          : setMessage({ ...message, ['newPassword']: MSG_06 });
        break;
      case 'reNewPassword':
        isValidPW(value) && value === password.newPassword
          ? setMessage({ ...message, ['reNewPassword']: MSG_08 })
          : setMessage({ ...message, ['reNewPassword']: MSG_09 });
        break;
      default:
        setMessage({
          ...{
            newPassword: '>',
            reNewPassword: '>',
          },
        });
    }
  };
  const checkIfValidPassword = async () => {
    if (
      !isValidPW(password.newPassword) ||
      !isValidPW(password.reNewPassword) ||
      !password.newPassword ||
      !password.reNewPassword ||
      password.newPassword !== password.reNewPassword
    ) {
      return;
    } else {
      return true;
    }
  };
  const sendNewPasswordToServer = async () => {
    const validPassword = await checkIfValidPassword();
    if (token && validPassword) {
      try {
        const result = await changePassword(password.newPassword);
        if (result === 200) {
          setMessage({
            ...message,
            ['reNewPassword']: '비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다 :)',
          });
        }
        return result;
      } catch {
        alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요 ㅜ_ㅜ');
      }
    }
  };
  const giveTimeToReadDescription = () => {
    setTimeout(() => {
      forceUserToLogout();
    }, 2000);
  };
  const forceUserToLogout = () => {
    setUser({
      memberId: 0,
      loginId: '',
      email: '',
      name: '',
      nickname: '',
      createdAt: '',
      profileImageId: 0,
    });
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  const tryChangPassword = async () => {
    const result = await sendNewPasswordToServer();
    if (result === 200) {
      giveTimeToReadDescription();
    } else {
      setMessage({
        ...message,
        ['reNewPassword']: '비밀번호 변경에 실패했습니다. 다시 시도해주세요 ㅜ_ㅜ',
      });
    }
  };
  const handleCancleButton = () => {
    setPassword({ ...password, newPassword: '', reNewPassword: '' });
    setMessage({ ...message, newPassword: '>', reNewPassword: '>' });
  };
  return (
    <Container>
      <ChangePasswordBox>
        <div className="title">비밀번호 변경</div>
        <form>
          <DefaultInput
            label="새 비밀번호"
            type="password"
            name="newPassword"
            value={password.newPassword}
            onChange={handlePasswordInputChange}
            message={message.newPassword}
            placeholder={MSG_06}
          />
          <DefaultInput
            label="새 비밀번호 확인"
            type="password"
            name="reNewPassword"
            value={password.reNewPassword}
            message={message.reNewPassword}
            onChange={handlePasswordInputChange}
            placeholder="비밀번호를 다시 입력해주세요"
          />
        </form>
      </ChangePasswordBox>
      <BtnWrapper>
        <Button text={'취소'} type={'white'} width={'short'} onClick={handleCancleButton} />
        <Button text={'변경'} type={'white'} width={'short'} onClick={tryChangPassword} />
      </BtnWrapper>
    </Container>
  );
};
export default ChangePassword;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const ChangePasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #464646;
    margin-bottom: 20px;
    text-align: left;
  }
  .message {
    color: #ff7f7f;
    font-size: 11px;
  }
  input {
    border: 1px solid #aba8a8;
  }
  @media screen and (max-width: 500px) {
    input {
      width: 280px;
      font-size: 11px;
    }
  }
`;

import { Container, FindBox, BtnWrapper } from './style';
import PageDescript from '../../components/Descript/PageDescript';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import { useNavigate } from 'react-router-dom';

interface Props {
  isPassword?: boolean;
  setisPassword?: (state: boolean) => void;
  email: string;
  name: string;
  loginId?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  errorMsg?: string;
  onClick: () => void;
}
const FindUserInfo = ({
  isPassword,
  setisPassword,
  email,
  name,
  loginId,
  onChange,
  errorMsg,
  onClick,
}: Props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <PageDescript
        title={isPassword ? '비밀번호 찾기' : 'ID 찾기'}
        descript={
          isPassword
            ? `가입하신 ID와 이메일, 이름을 입력하면, 비밀번호를 찾을 수 있어요 :)`
            : '가입하신 이름과 이메일을 입력하시면, 아이디를 찾을 수 있어요 :)'
        }
      />
      <FindBox>
        {isPassword ? (
          <DefaultInput
            label="아이디"
            name="loginId"
            value={loginId}
            onChange={onChange}
            placeholder="아이디를 입력해주세요"
          />
        ) : null}
        <DefaultInput
          label="이메일주소"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
        />
        <DefaultInput
          label="이름"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="이름을 입력해주세요"
        />
        <p className="msg">{errorMsg}</p>
      </FindBox>
      <BtnWrapper>
        <Button text={'취소'} onClick={() => navigate(-1)} type={'white'} width={'middle'} />
        <Button
          text={isPassword ? '비밀번호 찾기' : 'ID 찾기'}
          onClick={onClick}
          type={'beige'}
          width={'middle'}
        />
      </BtnWrapper>
    </Container>
  );
};
export default FindUserInfo;

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputDescript from '../../components/Descript/InputDescript';
import PageDescript from '../../components/Descript/PageDescript';
import SignupInput from '../../components/SignupInput/SignupInput';
import ButtonSocial from '../../UI/button/ButtonSocial';
import TextButton from '../../UI/button/TextButton';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <PageDescript
        title={'빌리지뭐는 개인간 렌탈 플랫폼입니다'}
        descript={'살까 말까 고민된다면 지금 여기서 빌리고 써보세요'}
      />
      <ButtonSocial text={'SNS 회원가입'} />
      <InputDescript text={'회원가입에 필요한 정보를 입력해주세요'} />
      <SignupInput />
      <BtnWrapper>
        <TextButton text={'이미 회원이신가요?'} btnText={'로그인'} onClick={() => navigate('/login')} />
      </BtnWrapper>
    </Container>
  );
};
export default Signup;
const Container = styled.div`
  margin-top: 60px;
  padding: 20px;
`;
const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 80px;
`;

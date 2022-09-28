import styled from 'styled-components';
import Button from '../../UI/button/Button';
import PageDescript from '../../components/Descript/PageDescript';
import ButtonSocial from '../../UI/button/ButtonSocial';
import TextButton from '../../UI/button/TextButton';
import InputDescript from '../../components/Descript/InputDescript';
import { useNavigate } from 'react-router-dom';
import DefaultInput from '../../UI/input/DefaultInput';

const Login = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PageDescript
                title={'빌리지뭐는 개인간 렌탈 플랫폼입니다'}
                descript={'살까 말까 고민된다면 지금 여기서 빌리고 써보세요'}
            />
            <ButtonSocial text={'SNS 로그인'} />
            <InputDescript text={'아이디로 로그인'} />
            <LoginBox>
                <DefaultInput placeholder="아이디" />
                <DefaultInput type="password" placeholder="비밀번호" />
                <Button
                    text={'로그인'}
                    type={'beige'}
                    onClick={() => console.log('hello')}
                />
            </LoginBox>
            <FindInfo>
                <TextButton btnText={'ID 찾기'} isGray={true} />
                <span>&#47;</span>
                <TextButton btnText={'비밀번호 찾기'} isGray={true} />
            </FindInfo>
            <BtnWrapper>
                <TextButton
                    text={'아직 회원이 아니신가요?'}
                    btnText={'회원가입'}
                    onClick={() => navigate('/signup')}
                />
            </BtnWrapper>
        </Container>
    );
};
export default Login;
const Container = styled.div`
    margin-top: 80px;
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }
`;
const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 15px;
    button {
        width: 100%;
    }
`;
const FindInfo = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        font-size: 12px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #727272;
        margin-left: 5px;
    }
    span {
        color: #727272;
        margin-left: 5px;
        font-size: 12px;
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
`;
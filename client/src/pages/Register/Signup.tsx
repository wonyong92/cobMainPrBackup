import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputDescript from '../../components/Descript/InputDescript';
import PageDescript from '../../components/Descript/PageDescript';
import Button from '../../UI/button/Button';
import ButtonSocial from '../../UI/button/ButtonSocial';
import TextButton from '../../UI/button/TextButton';
import DefaultInput from '../../UI/input/DefaultInput';

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
            <SignupBox>
                <label>아이디</label>
                <Button text={'중복확인'} type={'beige'} width={'short'} />
                <DefaultInput placeholder="아이디를 입력해주세요" />
                <label>비밀번호</label>
                <DefaultInput
                    placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호"
                    type="password"
                />

                <label>비밀번호 확인</label>
                <DefaultInput
                    placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호"
                    type="password"
                />

                <label>이름</label>
                <DefaultInput placeholder="이름을 입력해주세요" />
                <label>닉네임</label>
                <Button text={'중복확인'} type={'beige'} width={'short'} />
                <DefaultInput placeholder="2-15자 이하로 입력해주세요" />
                <label>이메일</label>
                <Button text={'중복확인'} type={'beige'} width={'short'} />
                <DefaultInput placeholder="이메일을 입력해주세요" />
            </SignupBox>
            <BtnWrapper>
                <Button text={'회원가입'} type={'beige'} />
                <TextButton
                    text={'이미 회원이신가요?'}
                    btnText={'로그인'}
                    onClick={() => navigate('/login')}
                />
            </BtnWrapper>
        </Container>
    );
};
export default Signup;
const Container = styled.div`
    margin-top: 80px;
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }
`;
const SignupBox = styled.div`
    margin-left: 5px;
    label {
        font-size: 13px;
        color: #464646;
    }
    button {
        position: relative;
        left: 180px;
        top: 35px;
    }
    input {
        height: 37px;
        width: 290px;
    }
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    button:first-child {
        margin-bottom: 20px;
    }
`;

import styled from 'styled-components';
import PageDescript from '../../components/Descript/PageDescript';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
import { useNavigate } from 'react-router-dom';
const FindPw = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <PageDescript
                title={'비밀번호 찾기'}
                descript={
                    '회원가입시 입력하신 아이디와 이메일 주소, 이름을 입력하시면, 새로운 비밀번호를 생성할 수 있습니다.'
                }
            />
            <FindBox>
                <label>아이디</label>
                <DefaultInput placeholder="아이디를 입력해주세요" />
                <label>이메일주소</label>
                <DefaultInput placeholder="이메일을 입력해주세요" />
                <label>이름</label>
                <DefaultInput placeholder="이름을 입력해주세요" />
            </FindBox>
            <BtnWrapper>
                <Button text={'취소'} type={'white'} width={'middle'} />
                <Button
                    text={'새 비밀번호 생성하기'}
                    type={'beige'}
                    width={'middle'}
                    onClick={() => navigate('/newpassword')}
                />
            </BtnWrapper>
        </Container>
    );
};
export default FindPw;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    label {
        font-size: 13px;
        color: #464646;
        margin-bottom: 5px;
    }
    input {
        margin-bottom: 18px;
    }
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        label {
            font-size: 13px;
            color: #464646;
            margin-bottom: 5px;
        }
        input {
            margin-bottom: 18px;
        }
    }
`;
const FindBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 30px;
    margin-bottom: 15px;
`;
const BtnWrapper = styled.div`
    display: flex;
    button {
        margin: 0 20px;
    }
`;

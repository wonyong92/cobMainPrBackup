import styled from 'styled-components';
import PageDescript from '../../components/Descript/PageDescript';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
const SetNewPassword = () => {
    return (
        <Container>
            <PageDescript title={'새 비밀번호 생성하기'} />
            <FindBox>
                <label>비밀번호</label>
                <DefaultInput placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호" />
                <label>비밀번호 확인</label>
                <DefaultInput placeholder="영문 소문자, 숫자, 특수문자 조합 8자 이상의 비밀번호" />
            </FindBox>
            <BtnWrapper>
                <Button text={'취소'} type={'white'} width={'middle'} />
                <Button
                    text={'새 비밀번호 생성하기'}
                    type={'beige'}
                    width={'middle'}
                />
            </BtnWrapper>
        </Container>
    );
};
export default SetNewPassword;
const Container = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
        font-size: 13px;
        color: #464646;
        margin-bottom: 5px;
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
    }
`;
const FindBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 30px;
    margin-bottom: 30px;
`;
const BtnWrapper = styled.div`
    display: flex;
    margin-top: 35px;
    button {
        margin: 0 20px;
    }
`;

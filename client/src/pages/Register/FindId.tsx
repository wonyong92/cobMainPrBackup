import styled from 'styled-components';
import PageDescript from '../../components/Descript/PageDescript';
import DefaultInput from '../../UI/input/DefaultInput';
import Button from '../../UI/button/Button';
const FindId = () => {
    return (
        <Container>
            <PageDescript
                title={'ID 찾기'}
                descript={
                    '회원가입시 입력하신 이름과 이메일 주소를 입력하시면, 아이디를 찾을 수 있습니다.'
                }
            />
            <FindBox>
                <label>이메일주소</label>
                <DefaultInput placeholder="이메일을 입력해주세요" />
                <label>이름</label>
                <DefaultInput placeholder="이름을 입력해주세요" />
            </FindBox>
            <BtnWrapper>
                <Button text={'취소'} type={'white'} width={'middle'} />
                <Button text={'ID 찾기'} type={'beige'} width={'middle'} />
            </BtnWrapper>
        </Container>
    );
};
export default FindId;
const Container = styled.div`
    margin-top: 80px;
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
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-top: 30px;
        margin-bottom: 30px;
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    button {
        margin: 0 20px;
    }
`;

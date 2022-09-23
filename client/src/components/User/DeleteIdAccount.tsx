import styled from 'styled-components';
import Button from '../../UI/button/Button';
const DeleteIdAccount = () => {
    return (
        <Container>
            <div className="title">계정삭제</div>
            <Info>
                <p className="descript">
                    계정을 삭제하면 게시글, 관심 등 모든 활동 정보가 삭제됩니다.
                </p>
            </Info>
            <CheckBox>
                <input type="checkbox"></input>
                <p className="descript">
                    계정 삭제에 관한 정책을 읽고 이에 동의합니다.
                </p>
            </CheckBox>
            <BtnWrapper>
                <Button
                    type="red"
                    text="회원탈퇴"
                    onClick={() => console.log('삭제')}
                ></Button>
            </BtnWrapper>
        </Container>
    );
};
export default DeleteIdAccount;
const Container = styled.div`
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: #464646;
        margin-bottom: 20px;
    }
    .descript {
        font-size: 12px;
        font-weight: 400;
        color: #464646;
    }
`;
const Info = styled.div`
    border: 1px solid #aba8a8;
    border-radius: 3px;
    padding: 15px;
    flex-grow: 1;
    @media screen and (max-width: 500px) {
        width: 290px;
        padding: 10px;
    }
`;
const CheckBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 18px;
    p {
        margin-left: 5px;
    }
    @media screen and (max-width: 500px) {
        display: flex;
        justify-content: space-between;
        width: 290px;
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        width: 80px;
    }
    @media screen and (max-width: 500px) {
        display: flex;
        justify-content: center;
        button {
            width: 290px;
        }
    }
`;

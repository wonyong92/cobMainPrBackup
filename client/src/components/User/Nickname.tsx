import styled from 'styled-components';
import Button from '../../UI/button/Button';
import DefaultInput from '../../UI/input/DefaultInput';
const Nickname = () => {
    return (
        <NicknameWrapper>
            <div className="title">닉네임</div>
            <DefaultInput value="정원드래곤" placeholder=""></DefaultInput>
            <BtnWrapper>
                <Button type={'white'} width={'short'} text={'취소'}></Button>
                <Button type={'white'} width={'short'} text={'변경'}></Button>
            </BtnWrapper>
        </NicknameWrapper>
    );
};
export default Nickname;
const NicknameWrapper = styled.div`
    padding-top: 5px;
    padding-left: 10px;
    .title {
        color: #4a4747;
        font-size: 14px;
        margin-bottom: 10px;
    }
    input {
        width: 300px;
        height: 30px;
        border: 1px solid #4a4747;
        border-radius: 3px;
        text-indent: 5px;
        margin-bottom: 10px;
    }
    @media screen and (max-width: 500px) {
        input {
            width: 95%;
        }
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 95%;
    margin-left: 15px;
    button {
        border: #4a4747 1px solid;
        margin-left: 15px;
        width: 50px;
        border-radius: 5px;
    }
    @media screen and (max-width: 500px) {
        margin-left: 0px;
        button {
            width: 40px;
            height: 30px;
            font-size: 12px;
        }
    }
`;

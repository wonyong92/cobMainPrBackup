import styled from 'styled-components';
const Nickname = () => {
    return (
        <NicknameWrapper>
            <div className="title">닉네임</div>
            <input value="정원드래곤"></input>
            <BtnWrapper>
                <button>취소</button>
                <button>변경</button>
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
        height: 30px;
        border: 1px solid #4a4747;
        border-radius: 3px;
        text-indent: 5px;
        margin-bottom: 10px;
        width: 95%;
    }
`;
const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 95%;
    button {
        cursor: pointer;
        background-color: transparent;
        padding: 5px;
        border-radius: 5px;
        color: #4a4747;
        border: #4a4747 1px solid;
        font-size: 12px;
        margin-left: 10px;
    }
`;

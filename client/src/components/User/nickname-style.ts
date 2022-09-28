import styled from 'styled-components';
export const NicknameWrapper = styled.div`
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
        padding-bottom: 30px;
        input {
            width: 95%;
        }
    }
`;
export const BtnWrapper = styled.div`
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

export const MsgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 300px;
    background-color: #f4fcfb;
    margin-top: 25px;
    p {
        font-size: 13px;
    }
    @media screen and (max-width: 500px) {
        width: 275px;
        p {
            font-size: 12px;
        }
    }
`;

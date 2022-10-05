import styled from 'styled-components';
export const Container = styled.div`
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 16px;
        font-weight: 600;
        color: #464646;
        margin-bottom: 20px;
        text-align: left;
    }
    .descript {
        font-size: 12px;
        font-weight: 400;
        color: #464646;
    }
`;
export const Info = styled.div`
    border: 1px solid #aba8a8;
    border-radius: 3px;
    padding: 15px;
    flex-grow: 1;
    @media screen and (max-width: 500px) {
        width: 290px;
        padding: 10px;
    }
`;
export const CheckBox = styled.div`
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
export const BtnWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    button {
        width: 80px;
        background-color: #f6acac;
        border: none;
        padding: 7px;
        color: white;
        border-radius: 3px;
        font-size: 12px;
    }
    .active {
        background-color: #ff7f7f;
        cursor: pointer;
    }
    .active:hover {
        background-color: #d35d61;
        transition: 0.2s;
    }
    @media screen and (max-width: 500px) {
        button {
            margin-right: 10px;
        }
    }
`;

import styled from 'styled-components';
export const ModalBackDrop = styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    @media screen and (max-width: 500px) {
        top: 10px;
        justify-content: center;
    }
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    top: 60px;
    left: 150px;
    padding: 10px;
    height: 40px;
    width: 100%;
    background-color: white;
    opacity: 0.8;

    @media screen and (max-width: 500px) {
        align-items: center;
        width: 340px;
        height: 420px;
        top: 10px;
        left: 0.01px;
        opacity: 1;
        box-shadow: rgba(100, 100, 100, 0.1) 1px -1px 3px 2px;
    }
`;
export const Top = styled.div`
    display: none;
    @media screen and (max-width: 500px) {
        display: flex;
        align-items: center;
        padding: 10px 0px;
        border-bottom: 1px solid #f1efef;
        width: 90%;
        margin-top: 5px;
        color: #282828;
        .title {
            font-weight: 600;
            font-size: 15px;
            width: 95%;
            text-align: center;
        }
        .icon {
            width: 5%;
            cursor: pointer;
        }
    }
`;
export const Bottom = styled.div`
    display: flex;

    @media screen and (max-width: 500px) {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        min-width: 280px;
        align-items: flex-start;
    }
`;

export const Item = styled.div`
    cursor: pointer;
    color: black;
    font-size: 14px;
    font-weight: 500;
    margin-right: 10px;
    &:hover {
        color: #96d1cc;
        transition: 0.2s;
    }
    @media screen and (max-width: 500px) {
        cursor: pointer;
        color: #464646;
        font-size: 14px;
        font-weight: 300;
        padding-top: 10px;
    }
`;

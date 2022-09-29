import styled from 'styled-components';
import { ReactComponent as Logo } from '../../asessts/img/logo.svg';
export const MyHeader = styled.header`
    width: 100vw;
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    border-bottom: 0.5px solid #f5f5f5;
    @media screen and (max-width: 500px) {
        flex-direction: column;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 10px;
    }
`;
export const Top = styled.div`
    display: flex;
    @media screen and (max-width: 500px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 350px;
        height: 40px;
    }
`;

export const LogoWrapper = styled.div<{
    menuModal: boolean;
}>`
    display: flex;
    align-items: center;
    cursor: pointer;
    .title {
        font-size: 22px;
        font-weight: 500;
        padding-top: 5px;
        margin-right: 10px;
    }

    .category {
        padding-top: 15px;
        padding-bottom: 5px;
        color: ${(props) => (props.menuModal === true ? '#95d1cc' : '#464646')};
        border-bottom: ${(props) =>
            props.menuModal === true ? '3px solid #95d1cc' : '3px solid transparent'};
    }
    .category:hover {
        color: #95d1cc;
    }
    @media screen and (max-width: 500px) {
        cursor: pointer;
        .title {
            font-size: 18px;
            padding-top: 3px;
        }
        .category {
            display: none;
        }
    }
`;

export const LogoSVG = styled(Logo)`
    margin: 0 10px;
`;
export const Icons = styled.div`
    display: none;
    @media screen and (max-width: 500px) {
        display: inline-block;
        margin-right: 10px;
        .icon {
            cursor: pointer;
            color: #95d1cc;
            width: 25px;
            height: 20px;
            margin-left: 10px;
        }
    }
`;
export const Bottom = styled.div`
    display: flex;
    justify-content: center;
    width: 30%;
    input {
        margin-top: 10px;
        min-width: 330px;
        text-indent: 5px;
        font-size: 12px;
    }
    .magnify {
        position: relative;
        top: 14px;
        right: 30px;
        color: #c0bec8;
        cursor: pointer;
    }
`;

export const DesktopTopRight = styled.div`
    display: flex;
    width: 200px;
    align-items: center;
    button {
        font-size: 13px;
        margin-left: 15px;
        white-space: nowrap;
    }
    .icon {
        cursor: pointer;
        color: #95d1cc;
        width: 25px;
        height: 20px;
    }
    @media screen and (max-width: 500px) {
        display: none;
    }
`;

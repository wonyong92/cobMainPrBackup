import React from 'react';
import styled from 'styled-components';
interface Prop {
    text: string;
    type: string;
    // size: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function Button({ text, type, onClick }: Prop) {
    const btnType: string = ['red', 'beige'].includes(type) ? type : 'default';
    // const btnSize: string = ['half'].includes(size) ? size : 'long';
    return (
        <Btn btnType={btnType} onClick={onClick}>
            {text}
        </Btn>
    );
}
export default Button;
Button.defaultProps = {
    type: 'default',
};
const Btn = styled.button<{ btnType: string }>`
    width: 310px;
    .half {
        width: 140px;
    }
    height: 35px;
    cursor: pointer;
    border: none;
    font-size: 14px;
    font-weight: 500;
    color: white;
    border-radius: 3px;
    background-color: ${(props) =>
        props.btnType === 'red'
            ? '#FF7F7F'
            : props.btnType === 'beige'
            ? '#DACDBA'
            : '#95d1cc;'};
`;

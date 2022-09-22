import React from 'react';
import styled from 'styled-components';
interface Prop {
    text: string;
    type: string;
    width: string;
    radius: string;

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
function Button({ text, type, width, radius, onClick }: Prop) {
    const btnType: string = ['red', 'beige', 'white'].includes(type)
        ? type
        : 'default';
    const btnWidth: string = ['middle', 'short'].includes(width)
        ? width
        : 'default';
    const btnRadius: string = ['deep'].includes(radius) ? radius : 'default';

    return (
        <Btn
            btnType={btnType}
            onClick={onClick}
            btnWidth={btnWidth}
            btnRadius={btnRadius}
        >
            {text}
        </Btn>
    );
}
export default Button;
Button.defaultProps = {
    type: 'default',
    width: 'default',
    radius: 'default',
};
const Btn = styled.button<{
    btnType: string;
    btnWidth: string;
    btnRadius: string;
}>`
    height: 33px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    width: ${(props) =>
        props.btnWidth === 'middle'
            ? '140px'
            : props.btnWidth === 'short'
            ? '70px'
            : '290px'};
    border: ${(props) =>
        props.btnType === 'white' ? '1px solid #D9D9D9' : 'none'};
    color: ${(props) => (props.btnType === 'white' ? '#464646' : 'white')};
    border-radius: ${(props) => (props.btnRadius === 'deep' ? '20px' : '3px')};
    background-color: ${(props) =>
        props.btnType === 'red'
            ? '#FF7F7F'
            : props.btnType === 'beige'
            ? '#DACDBA'
            : props.btnType === 'white'
            ? 'transparent'
            : '#95d1cc'};
`;

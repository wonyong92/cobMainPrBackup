import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    label {
        font-size: 13px;
        color: #464646;
    }
    input {
        height: 35px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #d9d9d9;
        text-indent: 5px;
        font-size: 12px;
    }
`;
const Message = styled.p<{ msgProp: string }>`
    margin-top: 3px;
    font-size: 11px;
    text-indent: 3px;
    color: ${(props) => (props.msgProp === '>' ? 'white' : '#ff7f7f')};
`;

interface Prop {
    type?: 'password' | 'text';
    label?: string;
    value?: string;
    name?: string;
    message?: string;
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any; //?
}
const DefaultInput = ({
    type = 'text',
    label,
    value,
    name,
    message,
    placeholder,
    onChange,
}: Prop) => {
    const msgProp: string = message!;
    return (
        <Container>
            {label && <label>{label}</label>}
            <input
                type={type}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                autoComplete={type === 'password' ? 'off' : ''}
            />
            <Message msgProp={msgProp}>{message}</Message>
        </Container>
    );
};
export default DefaultInput;

import styled from 'styled-components';

interface Prop {
    type: 'text';
    value: string;
    input: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ type, value, onChange }: Prop) => {
    return (
        <div>
            <TextBox
                type={type}
                value={value}
                onChange={(e) => console.log('잘찍힘')}
            />
        </div>
    );
};

const TextBox = styled.input`
    width: 200px;
    height: 27px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
`;

export default TextInput;

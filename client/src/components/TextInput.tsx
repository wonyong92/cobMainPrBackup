/* eslint-disable no-undef */
import styled from 'styled-components';

interface Prop {
  type: 'text';
  value: string;
  input: string;
  placeholder: string;
  
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ type, value, input, placeholder, onChange }: Prop) => {
  return (
    <div>
      <TextBox
        type={type}
        value={value}
        input={input}
        placeholder={placeholder}
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

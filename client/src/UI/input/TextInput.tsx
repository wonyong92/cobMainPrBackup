/* eslint-disable no-undef */
import styled from 'styled-components';

interface Prop {
  type: 'text';
  value: string | number;
  placeholder: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyup?: (e: any) => void;
}

const TextInput = ({ type, value, name, placeholder, onChange, onKeyup }: Prop) => {
  return (
    <div>
      <TextBox
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyup}
        name={name}
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
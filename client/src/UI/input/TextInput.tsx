/* eslint-disable no-undef */
import styled from 'styled-components';

interface Prop {
  name: string;
  type: 'text';
  value: string | number;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({name, type, value, placeholder, onChange }: Prop) => {

  return (
    <div>
      <TextBox
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
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

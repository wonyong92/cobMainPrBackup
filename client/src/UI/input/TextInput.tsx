/* eslint-disable no-undef */
import styled from 'styled-components';

interface Prop {
  type: 'text';
  value?: string | number;
  defaultValue?: string;
  placeholder: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyup?: (e: any) => void;
  onClick?: undefined | any;
}

const TextInput = ({ type, value, defaultValue, name, placeholder, onChange, onKeyup, onClick }: Prop) => {
  return (
    <div>
      <TextBox
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={onKeyup}
        name={name}
        onClick={onClick}
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

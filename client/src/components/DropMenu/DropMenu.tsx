import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react';
import styled from 'styled-components';
interface Content {
  id: number;
  name: string;
}
interface DropProps {
  props?: Content[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  state?: string;
}

const DropMenu = ({ props, onChange, state }: DropProps) => {
  return (
    <>
      <DropdownContainer onChange={onChange}>
        <option key="000">{!state ? '옵션을 선택해주세요' : state}</option>
        {props &&
          props.map((el: any) => {
            return <ItemName key={el.id}>{el.name}</ItemName>;
          })}
      </DropdownContainer>
    </>
  );
};

const DropdownContainer = styled.select`
  width: 550px;
  height: 27px;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 5px;
  background-color: white;
  border-bottom: 1px solid #ececec;
  @media screen and (max-width: 500px) {
    width: 330px;
    height: 35px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ItemName = styled.option`
  font-weight: bold;
`;

export default DropMenu;

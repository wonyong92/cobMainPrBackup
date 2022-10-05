import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, Key } from 'react';
import styled from 'styled-components';


interface DropProps {
  
  props: object[]

  
  
}

const DropMenu = ({props}:DropProps) => {
    
    return (
        <>
        <DropdownContainer>
        {props.map((el:any) => (
          <ItemName key={el.id}>
            {el.name}
            </ItemName>
             ))}
          </DropdownContainer>
          </>
    );
    }
    

const DropdownContainer = styled.select`
  width: 200px;
  height: 27px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding-left: 10px;
  background-color: rgb(233, 233, 233);

  &:hover {
    cursor: pointer;
  }
`;

const ItemName = styled.option`
  font-weight: bold;
`;

export default DropMenu;    

import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { location } from '../../constants';

interface DropProps {
  name: string;
}

const DropLocation = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e: any) => {
    const targetId = e.target;
    console.log(e.target.id);

    if (targetId === 'item_name') {
      setItem(e.target.parentElement.innertText);
    } else if (targetId === 'item') {
      setItem(e.target.innertText);
    }

    setIsActive((prev) => !prev);
  }, []);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
          </>
        ) : (
          <>
            <DropdownSelect>지역을 선택해주세요</DropdownSelect>
          </>
        )}
      </DropdownBody>
      <DropdownMenu isActive={isActive}>
        {location.map((item) => (
          <DropdownItemContainer id="item" key={item.lid} onClick={onSelectItem}>
            <ItemName id="item_name">{item.name}</ItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
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

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3px;
`;

const DropdownSelect = styled.p`
  font-size: 15px;
  color: #adaaaa;
`;

const DropdownMenu = styled.ul<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 400px;
  background-color: white;
  position: absolute;
  border: 2px solid #f4acbb;
  z-index: 999;
`;

export const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  border-bottom: 2px solid #d2d2d2;
  border-top: none;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.p`
  font-weight: bold;
`;

export default DropLocation;

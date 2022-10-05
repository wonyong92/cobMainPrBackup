import styled from 'styled-components';
interface Prop {
  text?: string;
  btnText: string;
  isGray?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const TextButton = ({ text, btnText, isGray, onClick }: Prop) => {
  const btnColor: boolean = isGray ? true : false;
  return (
    <Container>
      {!isGray && <Text className="title">{text}</Text>}
      <Btn btnColor={btnColor} onClick={onClick}>
        {btnText}
      </Btn>
    </Container>
  );
};
export default TextButton;
const Container = styled.div`
  display: flex;
`;
const Text = styled.div`
  color: #727272;
  font-size: 12px;
  margin-right: 10px;
`;
const Btn = styled.button<{ btnColor: boolean }>`
  cursor: pointer;
  color: ${(props) => (props.btnColor ? '#727272' : '#c1a57c;')};
  font-weight: 400;
  font-size: 12px;
  background-color: transparent;
  border: none;
  &:hover {
    color: ${(props) => (props.btnColor ? '#b6b3b3' : '#e2ccac;')};
    transition: 0.2s;
  }
`;

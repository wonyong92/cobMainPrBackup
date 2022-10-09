import styled from 'styled-components';
import { ReactComponent as Git } from '../../asessts/img/github.svg';
const MyFooter = styled.footer`
  font-size: 12px;
  text-align: center;
  color: #464646;
  border-top: 1px solid #f1efef;
  box-shadow: rgba(100, 100, 100, 0.1) 0px -2px 6px;
  width: 100%;
  padding: 15px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin: 3px;
  }
  a {
    margin: 3px;
    text-decoration: none;
    color: #464646;
  }
`;
const GitIconSVG = styled(Git)`
  width: 20px;
`;

const Footer = () => {
  const gitUrl = `https://github.com/codestates-seb/seb39_main_023/tree/front`;
  return (
    <MyFooter>
      <div>@ 2022 빌리지뭐, All rights reserved.</div>
      <Wrapper>
        <GitIconSVG />
        <a href={gitUrl}>Team 023 Github repository</a>
      </Wrapper>
      <Wrapper>
        <div>BE 장원용</div>
        <div>FE 남충현</div>
        <div>FE 문도연</div>
      </Wrapper>
    </MyFooter>
  );
};
export default Footer;

import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  min-height: 1000px;
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 500px;
    padding: 0px 15px;
  }
`;
export const Top = styled.div`
  width: 260px;
  border-right: 1px solid #efefef;
  padding-right: 15px;
  .title {
    color: #171715;
    font-size: 16px;
    font-weight: 500;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    border-bottom: 1px solid #efefef;
    border-right: none;
  }
`;
export const Btns = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  .active {
    background-color: #e4d8c6;
    transition: 0.2s;
  }
  .deActive {
    background-color: transparent;
    transition: 0.2s;
  }
`;
export const BtnWrapper = styled.div`
  button {
    color: #464646;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    text-align: left;
    background-color: transparent;
    border: none;
  }
  .icon {
    position: relative;
    color: #464646;
    top: 2px;
    left: 30px;
  }
`;
export const Bottom = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  @media screen and (max-width: 500px) {
    padding-top: 15px;
  }
`;

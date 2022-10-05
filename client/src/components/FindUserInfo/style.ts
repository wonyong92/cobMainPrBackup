import styled from 'styled-components';
export const Container = styled.div`
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    font-size: 13px;
    color: #464646;
    margin-bottom: 5px;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  .msg {
    font-size: 13px;
    color: #f97f7f;
  }
`;
export const FindBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 30px;
  margin-bottom: 30px;
  @media screen and (max-width: 500px) {
    width: 85%;
  }
`;
export const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  @media screen and (max-width: 500px) {
    width: 85%;
  }
`;

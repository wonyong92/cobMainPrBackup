import styled from 'styled-components';
export const Container = styled.div`
  button {
    position: relative;
    height: 27px;
  }
  button:first-of-type {
    top: 50px;
    left: 234px;
  }
  button:nth-of-type(2) {
    left: 234px;
    bottom: 133px;
  }
  button:nth-of-type(3) {
    left: 164px;
    bottom: 55px;
  }
  @media screen and (max-width: 500px) {
    button:first-of-type {
      left: 203px;
    }
    button:nth-of-type(2) {
      left: 203px;
    }
    button:nth-of-type(3) {
      left: 133px;
    }
  }
`;
export const BtnWrapper = styled.div`
  margin-top: 20px;
  button {
    width: 100%;
  }
`;

import styled from 'styled-components';
export const Container = styled.div`
  button {
    position: relative;
    height: 27.5px;
  }
  button:first-of-type {
    top: 50.5px;
    left: 234px;
  }
  button:nth-of-type(2) {
    top: 362.5px;
    left: 164px;
  }
  button:nth-of-type(3) {
    top: 440.5px;
    left: 94px;
  }
  @media screen and (max-width: 500px) {
    button:first-of-type {
      top: 51.5px;
      left: 203px;
    }
    button:nth-of-type(2) {
      top: 362.5px;
      left: 134px;
    }
    button:nth-of-type(3) {
      top: 440.5px;
      left: 64px;
    }
  }
`;
export const BtnWrapper = styled.div`
  margin-top: 20px;
  button {
    width: 100%;
  }
`;

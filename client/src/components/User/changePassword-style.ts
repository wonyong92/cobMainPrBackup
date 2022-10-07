import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const ChangePasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #464646;
    margin-bottom: 20px;
    text-align: left;
  }
  .message {
    color: #ff7f7f;
    font-size: 11px;
  }
  input {
    border: 1px solid #aba8a8;
  }
  @media screen and (max-width: 500px) {
    input {
      width: 280px;
      font-size: 11px;
    }
  }
`;

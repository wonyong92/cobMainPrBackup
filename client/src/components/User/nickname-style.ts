import styled from 'styled-components';
export const NicknameWrapper = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  .title {
    color: #4a4747;
    font-size: 14px;
    margin-bottom: 10px;
  }
  input {
    width: 300px;
    height: 35px;
    border: 1px solid #4a4747;
    border-radius: 3px;
    text-indent: 5px;
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 30px;
    input {
      width: 95%;
    }
  }
`;
export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin-left: 15px;
  button {
    border: #4a4747 1px solid;
    margin-left: 15px;
    width: 50px;
    border-radius: 5px;
    white-space: nowrap;
  }
  @media screen and (max-width: 500px) {
    margin-left: 0px;
  }
`;

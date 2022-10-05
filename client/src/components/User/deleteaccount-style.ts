import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 180px;
  padding-right: 10px;
  justify-content: space-around;
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #464646;
    text-align: left;
  }
  .descript {
    font-size: 13px;
    font-weight: 400;
    color: #464646;
  }
  @media screen and (max-width: 500px) {
    min-height: 200px;
  }
`;
export const Info = styled.div`
  border: 1px solid #aba8a8;
  border-radius: 3px;
  padding: 10px;
`;
export const CheckBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  p {
    margin-left: 5px;
  }
`;
export const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    width: 80px;
    background-color: #f6acac;
    border: none;
    padding: 7px;
    color: white;
    border-radius: 3px;
    font-size: 12px;
  }
  .active {
    background-color: #ff7f7f;
    cursor: pointer;
  }
  .active:hover {
    background-color: #d35d61;
    transition: 0.2s;
  }
`;

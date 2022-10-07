import styled from 'styled-components';
export const Container = styled.div`
  padding-top: 5px;
  padding-left: 10px;
  margin-bottom: 40px;
  min-height: 150px;
  .title {
    color: #4a4747;
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    min-height: 0px;
  }
`;
export const ImgWrapper = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  align-items: flex-end;
  img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
  }
  button {
    border: #4a4747 1px solid;
    margin-left: 15px;
    width: 50px;
    border-radius: 5px;
  }
  @media screen and (max-width: 500px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

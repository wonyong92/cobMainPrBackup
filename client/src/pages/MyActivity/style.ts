import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 1000px;
  .errorMsg {
    font-size: 13px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0px 15px;
    min-height: 500px;
  }
`;

export const Title = styled.div`
  text-align: left;
  font-weight: 500;
  margin-bottom: 15px;
`;
export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9fffe;
  border-left: #efeded 0.5px solid;
  border-right: #efeded 0.5px solid;
  border-bottom: #efeded 0.5px solid;
  margin-bottom: 20px;
  height: 40px;
  padding-left: 10px;
  .subtitle {
    margin-left: 10px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    color: #95d1cc;
    border-bottom: 3px solid #95d1cc;
    cursor: pointer;
  }
  .deActive {
    font-size: 14px;
    margin-left: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
    border-bottom: 3px solid transparent;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    .subtitle {
      font-size: 12px;
    }
    .deActive {
      font-size: 12px;
    }
  }
`;

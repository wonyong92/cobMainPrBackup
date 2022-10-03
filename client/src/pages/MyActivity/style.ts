import styled from 'styled-components';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 980px;
  margin-top: 15px;
  @media screen and (max-width: 500px) {
    width: 95%;
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
    padding-top: 15px;
    padding-bottom: 10px;
    font-size: 14px;
    color: #95d1cc;
    border-bottom: 3px solid #95d1cc;
    cursor: pointer;
  }
  .deActive {
    font-size: 14px;
    margin-left: 15px;
    padding-top: 15px;
    padding-bottom: 10px;
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
